"""Prepare the three-second opening with a packed alpha mask.
Usage: python prepare-opening.py /path/to/uzu.mp4
Needs imageio-ffmpeg, numpy, scipy (asset preparation only; no runtime dependencies).
The MP4's left half is artwork, right half is its alpha mask. Removing only
background connected to the frame edges preserves dark paint inside the artwork.
"""
from pathlib import Path
import subprocess
import sys
import imageio_ffmpeg
import numpy as np
from scipy import ndimage

SIZE = 512
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
output = Path(__file__).resolve().parents[1] / 'public/videos/uzu-opening-alpha.mp4'
decode = subprocess.Popen([ffmpeg, '-v', 'error', '-i', sys.argv[1],
    '-vf', f'setpts=(PTS-STARTPTS)/2.9,fps=30,scale={SIZE}:{SIZE}',
    '-t', '3', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
encode = subprocess.Popen([ffmpeg, '-v', 'error', '-y', '-f', 'rawvideo',
    '-pix_fmt', 'rgb24', '-s', f'{SIZE*2}x{SIZE}', '-r', '30', '-i', '-',
    '-an', '-c:v', 'libx264', '-crf', '17', '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-colorspace', 'bt709', '-color_primaries', 'bt709',
    '-color_trc', 'bt709', '-movflags', '+faststart', str(output)], stdin=subprocess.PIPE)
frames = 0
while True:
    raw = decode.stdout.read(SIZE*SIZE*3)
    if not raw:
        break
    rgb = np.frombuffer(raw, np.uint8).reshape(SIZE,SIZE,3)
    color = rgb[0,0].astype(np.float32)
    distance = np.linalg.norm(rgb.astype(np.float32)-color, axis=2)
    candidates = distance < 38
    border = np.zeros((SIZE,SIZE),dtype=bool)
    border[0,:]=border[-1,:]=border[:,0]=border[:,-1]=True
    background = ndimage.binary_propagation(border & candidates, mask=candidates)
    alpha = ndimage.gaussian_filter((~background).astype(np.float32), .55)
    mask = np.repeat((alpha*255).astype(np.uint8)[:,:,None],3,axis=2)
    encode.stdin.write(np.concatenate([rgb,mask],axis=1).tobytes())
    frames += 1
encode.stdin.close()
assert decode.wait() == 0 and encode.wait() == 0
assert frames == 90, frames
print(f'Prepared {frames} frames: {output.name}')

# One transparent atlas scrubs reliably on phones without video autoplay/seek.
atlas = output.parents[1] / 'images/uzu-scroll-frames.webp'
subprocess.run([ffmpeg, '-v', 'error', '-y', '-i', str(output), '-filter_complex',
    '[0:v]split=2[left][right];[left]crop=512:512:0:0,format=rgb24[color];'
    '[right]crop=512:512:512:0,format=gray[mask];'
    '[color][mask]alphamerge,scale=256:256,tile=10x9[out]',
    '-map', '[out]', '-frames:v', '1', '-c:v', 'libwebp', '-quality', '88', str(atlas)], check=True)
print(f'Prepared transparent scroll atlas: {atlas.name}')
