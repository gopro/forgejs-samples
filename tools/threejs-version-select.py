#!/usr/bin/env python
import os, os.path, sys, re, shutil, argparse

RE_THREE_RELEASE = r"three.r[\w]*"


def getThreeRelease(path):
    fr = open(path, 'r')
    lines = fr.readlines()
    release = ""
    for line in lines:
        result = re.search(RE_THREE_RELEASE, line)
        if result is not None:
            release = result.group().split('.')[-1]
            print "Project <%s> three.js %s" % (path.split('/')[-2], result.group().split('.')[-1])
    fr.close()
    return release


def setThreeRelease(path, release):
    outPath = "%s.tmp" % path

    fr = open(path, 'r')
    fw = open(outPath, 'w')

    for line in fr.readlines():
        fw.write(re.sub(RE_THREE_RELEASE, "three.r%s" % release, line))

    fr.close()
    fw.close()

    shutil.move(outPath, path)
    print "Project <%s> fixed to three.js r%s" % (path.split('/')[-2], release)


def main(args):

    projectsDir = os.path.join(os.getcwd(), "projects")
    if not os.path.isdir(projectsDir):
        print "Cannot find projects directory"
        sys.exit()

    dirs = os.listdir(projectsDir)
    for d in dirs:
        if (d == ".DS_Store"):
            continue

        htmlPath = os.path.join(projectsDir, d, "index.html")

        if not os.path.exists(htmlPath):
            continue

        if args.list:
            getThreeRelease(htmlPath)

        if args.release == 0 or args.project == None:
            continue

        if args.project == "all" or args.project == d:
            setThreeRelease(htmlPath, args.release)


if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='THREE.js release selector for samples projects.')

    parser.add_argument('-l', '--list',
                        dest='list',
                        action='store_true',
                        default=False,
                        help='List THREE.js release used')

    parser.add_argument('-p', '--project',
                        dest='project',
                        action='store',
                        default=None,
                        help='Project to fix THREE.js release. Magic words: all, none')

    parser.add_argument('-r', '--release',
                        dest='release',
                        default=0,
                        action='store',
                        help='Set THREE.js release')

    args = parser.parse_args()

    if args.release != 0 and args.project == None:
        print "No project selected to set release r%s" % args.release
        sys.exit(0)

    main(args)

