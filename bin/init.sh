#!/bin/bash
direc=`dirname $0`
function color(){
    blue="\033[0;36m"
    red="\033[0;31m"
    green="\033[0;32m"
    close="\033[m"
    case $1 in
        blue)
            echo -e "$blue $2 $close"
        ;;
        red)
            echo -e "$red $2 $close"
        ;;
        green)
            echo -e "$green $2 $close"
        ;;
        *)
            echo "Input color error!!"
        ;;
    esac
}
#提示
function copyright(){
    echo "#####################"
    color blue " INIT DATA "
    echo "#####################"
    echo
}

function underline(){
    color blue "-----------------------------------------"
}
#数据初始化
function main(){
     underline
     read -p '[*] 选择mongod数据库位置: ' path
     mongod --dbpath $path 
     color green "* Mongodb -Start!!"
     mongoimport -d memory -c users --drop ./users-mock.txt
     underline
     color green "* Mongodb -Init!!"
}

copyright
main