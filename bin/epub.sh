#!/usr/bin/env bash

set -ex

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
ROOT_DIR=$(cd "$SCRIPT_DIR/.." && pwd)
INPUT_DIR=$(cd "$ROOT_DIR/docs" && pwd)
OUTPUT_DIR="$ROOT_DIR/output"

mkdir -p "$OUTPUT_DIR"

convert_to_epub() {
	OUTPUT_BOOK="$OUTPUT_DIR/软件设计哲学.epub"

	rm -f "$OUTPUT_BOOK"
	echo "Converting to EPUB format..."

	local meta_file="$INPUT_DIR/metadata.yaml"
	local css_file="$ROOT_DIR/css/epub.css"

	pandoc -o "$OUTPUT_BOOK" --metadata-file="$meta_file" \
		--toc-depth=2 \
		--top-level-division=chapter \
		--file-scope=true \
		--css="$css_file" \
		--webtex \
		--wrap=preserve \
		"$INPUT_DIR/ch01.md" \
		"$INPUT_DIR/ch02.md" \
		"$INPUT_DIR/ch03.md" \
		"$INPUT_DIR/ch04.md" \
		"$INPUT_DIR/ch05.md" \
		"$INPUT_DIR/ch06.md" \
		"$INPUT_DIR/ch07.md" \
		"$INPUT_DIR/ch08.md" \
		"$INPUT_DIR/ch09.md" \
		"$INPUT_DIR/ch10.md" \
		"$INPUT_DIR/ch11.md" \
		"$INPUT_DIR/ch12.md" \
		"$INPUT_DIR/ch13.md" \
		"$INPUT_DIR/ch14.md" \
		"$INPUT_DIR/ch15.md" \
		"$INPUT_DIR/ch16.md" \
		"$INPUT_DIR/ch17.md" \
		"$INPUT_DIR/ch18.md" \
		"$INPUT_DIR/ch19.md" \
		"$INPUT_DIR/ch20.md" \
		"$INPUT_DIR/ch21.md" \
		"$INPUT_DIR/summary.md"
}

convert_to_epub