#! /usr/bin/python3
# Helfer-Skript zum Erstellen neuer Posts

import time
import os
import argparse
import shutil

# Kommandozeilen-Parser
parser = argparse.ArgumentParser(description='Skript zum einfachen Erstellen neuer Posts')
parser.add_argument('title',
    help="Titel des Posts")
parser.add_argument('image',
    help="Pfad(e) zu den Bild-Assets (Optional!)",
    nargs="*")
parser.add_argument('--no-assets',
    action="store_true",
    help="Erstelle _keinen_ Asset-Ordner für Bilder",
    default=False)
args = parser.parse_args()


today = time.strftime("%Y-%m-%d")
assets = "./assets/posts/" + today + "/"

# Erstelle Ordner für Assets, kopiere Bilder
# TODO: Auto-Optimiere Bilder (Imagemagick?)
if not args.no_assets:
    print("Erstelle Ordner...")
    os.makedirs(assets, exist_ok=True)
    for image in args.image:
        print("Kopiere Bild...")
        shutil.copyfile(image, assets + os.path.basename(image))

# Erstelle Post-Datei mit Jekyll Front Matter
title = today + "-" + args.title.replace(" ", "-")
with open('./_posts/' + title,'w') as file:
    file.write("---\n")
    file.write("layout: post\n")
    file.write("title: " + args.title + "\n")
    file.write("date: " + time.strftime("%Y-%m-%d %H:%M:%S %z") + "\n")
    file.write("---\n")
