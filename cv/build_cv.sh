#!/usr/bin/env bash
# Build the CV PDF and copy it into the website's files/ folder.
# Usage:  bash cv/build_cv.sh        (from the repo root, or from anywhere)
# Needs pdflatex on the PATH (MiKTeX on Olivier's laptop).
set -euo pipefail
cd "$(dirname "$0")"
pdflatex -interaction=nonstopmode -halt-on-error cv.tex > /dev/null
pdflatex -interaction=nonstopmode -halt-on-error cv.tex > /dev/null   # second pass for page totals
mkdir -p ../files
cp cv.pdf ../files/CV_Olivier_Marie.pdf
rm -f cv.aux cv.log cv.out
echo "Built files/CV_Olivier_Marie.pdf ($(pdfinfo cv.pdf 2>/dev/null | awk '/^Pages/{print $2}') pages)"
