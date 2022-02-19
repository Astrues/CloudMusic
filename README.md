因为贴图都是用绝对路径，所以肯定看不到图片，我就把图片保存到了一起......

##### 1

这是最初的视图，因为刚开始写大框架的时候没怎么用flex布局![1](C:\Users\123\Desktop\CloudMusic\README\image\1.png)



##### 2

所以不是放到最大就很布局就有问题，因为发现后已经写了很多了，要改的话要改很多地方，怕哪个地方改错了到时候一直找不到问题，系统的缩放与布局我设置的100%，笔记本一般是125%，布局也会有偏差。

![2](C:\Users\123\Desktop\CloudMusic\README\image\2.png)

​		

##### 3

歌曲播放进度条会移动，进度条和声音都能调整，但只能拖拽那个点，点击某个位置跳转的功能我没有做。。。。。

![3](C:\Users\123\Desktop\CloudMusic\README\image\3.png)

​		

##### 4

跨域问题是靠插件解决的，如果直接打开就会报错。有时候用插件打开后刷新也会报错，但过会儿就好了。不知道为什么。

![4](C:\Users\123\Desktop\CloudMusic\README\image\4.png)

##### 5

点击某个歌单封面能跳转到详细内容，等歌单内的歌曲加载后就能点击播放了，点击播放全部能把歌单里面的歌曲添加到播放列表，点击右下角小按钮能打开播放列表。具备上一首下一首功能，歌曲的时间我用了audio的canplaythough来获得，但是在for循环里面的异步函数，能获得所有的时间，但是不能调用，然后时间也会变化成最后一个音频的时间，用了封闭函数也解决不了，递归又不怎么会用..........

![5](C:\Users\123\Desktop\CloudMusic\README\image\5.png)

##### 6

评论是可以正常看的（但是不能评论...），但这里的透视bug我不知道怎么回事，因为它只有一小块漏出来了，其它的都没漏，推荐歌单点击后我没有把它的属性设置为none，因为我用了flex布局，后面为了用起来更方便写了个点击左上角logo返回主界面的功能，如果设置成了none，后面改回block，flex就会失效，布局也就有问题了.

![6](C:\Users\123\Desktop\CloudMusic\README\image\6.png)

##### 7

音乐播放图片会转动，但是这个歌词我实在不知道应该怎么用......

![7](C:\Users\123\Desktop\CloudMusic\README\image\7.png)

##### 8

登录后可以从左下角查看自己的歌单，点击同样可以播放.

![8](C:\Users\123\Desktop\CloudMusic\README\image\8.png)

##### 9

热搜榜点击可以搜索，点击搜索的内容可以播放。hot图片我实在放不小，用接口文档里面的方法设置尺寸它会被裁减，不全....

![9](C:\Users\123\Desktop\CloudMusic\README\image\9.png)

##### 10

搜索建议，点击不能播放。点击事件失效了。但是点击回车可以搜索内容，点击搜索列表可以播放

![10](C:\Users\123\Desktop\CloudMusic\README\image\10.png)

##### 11

歌单广场做了分类功能，点击全部歌单里面的一个也可以跳转到详细页，分类后点击不行，没有复制粘贴代码（如果最开始就写个函数就好了）

![11](C:\Users\123\Desktop\CloudMusic\README\image\11.png)

##### 12

排行榜和歌手榜都没做了.....,保留登录状态的也不会做。我是fw

![www](C:\Users\123\Desktop\CloudMusic\README\image\www.jpg)