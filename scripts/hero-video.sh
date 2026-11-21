#!/usr/bin/env bash
# Hero arka plan döngüsü: DJI_00001.mp4'ten 12,5-20,5 sn (dönerek alçalan gece çekimi).
# Son saniye başa çapraz geçişle bağlanır, döngüde kesik görünmez. Ses yok.
# Kullanım: bash scripts/hero-video.sh <kaynak.mp4> <ffmpeg yolu>
set -euo pipefail
SRC="${1:-C:/Users/necip1/necipbozdemir-gorseller/videolar/DJI_00001.mp4}"
FF="${2:-C:/Users/necip1/AppData/Local/Programs/Python/Python312/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe}"
OUT=public/media
LOOP="[0:v]fps=25,split[x][y];[x]trim=1:8,setpts=PTS-STARTPTS,fps=25[main];[y]trim=0:1,setpts=PTS-STARTPTS,fps=25[head];[main][head]xfade=transition=fade:duration=1:offset=6"
enc() { "$FF" -hide_banner -loglevel error -y -ss 12.5 -t 8 -i "$SRC" -an -filter_complex "$LOOP,$1[o]" -map "[o]" -c:v libx264 -preset veryslow -crf "$2" -tune film -pix_fmt yuv420p -movflags +faststart "$3"; }
enc "scale=1280:720" 28 "$OUT/hero-1280.mp4"
enc "crop=720:720,scale=720:720" 31 "$OUT/hero-720.mp4"
# Afiş kareleri: döngünün ilk karesi (LCP görseli, astro:assets ile AVIF'e çevrilir)
"$FF" -hide_banner -loglevel error -y -ss 13.5 -i "$SRC" -frames:v 1 -q:v 2 src/assets/img/hero-gece.jpg
"$FF" -hide_banner -loglevel error -y -ss 13.5 -i "$SRC" -frames:v 1 -vf "crop=720:720" -q:v 2 src/assets/img/hero-gece-kare.jpg
ls -la "$OUT"/hero-* src/assets/img/hero-gece*
