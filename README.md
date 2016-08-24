# nodejsLession

Node编译安装
1.安装node。
2.安装node需要的express插件
3.包含内容：
  1) websocket. 
  2) nodejs搭建服务器
  3) nodejs路由分发
  4) nodejs post，get请求

在Centos中一般需要根据项目的环境安装指定版本的Node, 而现有的yum源版本一般不够全面也不一定找的到所需要的指定版本, 此时就必须自行下载Node源码进行编译安装了, 此处一点需要注意:如果打算后续使用Node的版本管理工具n及不想要安装冗余的Node话, 那么在configure时就需要注意下设置Node安装路径前缀为--prefix=/usr/local而不是其他路径, 这样安装完成后指定的Node版本就安装到了/usr/local下面(当然后续还需要使用n命令重新安装该版本因为当前版本不在/usr/local/n/versions/node目录下面,或者一开始即可将Node安装到/usr/local/n/versions/node/[version](版本号)路径下面该种方法最优, 本文就使用第一种方法介绍), 该路径会出现以下四个文件夹:

bin/ 		include/       		lib/			share



export NODE_HOME=/usr/local
export PATH=$NODE_HOME/bin:$PATH
export NODE_PATH=$NODE_HOME/lib/node_modules:$PATH
(最后一项是不同Node版本包路径)
