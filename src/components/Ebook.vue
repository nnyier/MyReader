<template>
  <div class='ebook'>
    <title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"></title-bar>
    <div class="reader-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left"
             @click="prevPage"></div>
        <div class="center"
             @click="toggleTitleAndMenu"></div>
        <div class="right"
             @click="nextPage"></div>
      </div>
    </div>
    <menu-bar ref="MenuBar"
              :ifTitleAndMenuShow="ifTitleAndMenuShow"
              :fontSizeList="fontSizeList"
              :defaultFontSize="defaultFontSize"
              :themeList="themeList"
              :defaultTheme="defaultTheme"
              :bookAvailable="bookAvailable"
              :navigation="navigation"
              @jumpTo="jumpTo"
              @onProgressChange="onProgressChange"
              @setTheme="setTheme"
              @setFontSize="setFontSize"></menu-bar>
  </div>
</template>

<script>
import TitleBar from "../views/TitleBar";
import MenuBar from "../views/MenuBar";
import Epub from "epubjs";
// const DOWNLOAD_URL = "/2018_Book_AgileProcessesInSoftwareEngine.epub";
const DOWNLOAD_URL = "/1365.epub";

export default {
  name: "Ebook",
  components: {
    TitleBar,
    MenuBar
  },
  data() {
    return {
      ifTitleAndMenuShow: false,
      fontSizeList: [
        {
          fontSize: 12
        },
        {
          fontSize: 14
        },
        {
          fontSize: 16
        },
        {
          fontSize: 18
        },
        {
          fontSize: 20
        },
        {
          fontSize: 22
        },
        {
          fontSize: 24
        }
      ],
      defaultFontSize: 14,
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff"
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "#cee"
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              color: "#fff",
              background: "#000"
            }
          }
        },
        {
          name: "glod",
          style: {
            body: {
              color: "#000",
              background: "rgb(241,236,226)"
            }
          }
        }
      ],
      defaultTheme: 0,
      // 图书可用状态
      bookAvailable: false,
      navigation: {}
    };
  },
  mounted() {
    this.showEpub();
    this.setTheme(this.defaultTheme);
  },
  methods: {
    showEpub() {
      // 生成Book
      this.book = new Epub(DOWNLOAD_URL);
      // 生成Rendition，通过Book.renderTo
      this.rendition = this.book.renderTo("read", {
        // 全屏
        width: window.innerWidth,
        height: window.innerHeight
      });
      // 通过Rendition.display渲染电子书
      this.rendition.display();
      // 获取Theme对象
      this.themes = this.rendition.themes;
      // 设置默认字体
      this.setFontSize(this.defaultFontSize);
      // 主题切换
      // this.themes.register(name.styles) 注册
      // this.themes.select(name) 选择
      this.registerTheme();
      // this.themes.select("night");
      // 获取location对象
      // console.log(this.book.locations);
      // 默认不会生成
      this.book.ready
        .then(() => {
          // 目录
          this.navigation = this.book.navigation;
          return this.book.locations.generate();
        })
        .then(result => {
          this.locations = this.book.locations;
          // this.onProgressChange(1);
          // 生成后将状态设置为true
          this.bookAvailable = true;
        });
    },
    // 根据链接跳转目录
    jumpTo(href) {
      this.rendition.display(href);
      this.hideTitleAndMenu();
    },
    hideTitleAndMenu() {
      // 隐藏标题栏和菜单栏
      this.ifTitleAndMenuShow = false;
      // 隐藏菜单栏弹出的设置栏
      this.$refs.MenuBar.hideSetting();
      // 隐藏目录
      this.$refs.MenuBar.hideContent();
    },
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style);
      });
    },
    setTheme(index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
    },
    // progress 进度条数值（0-100）
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next();
      }
    },
    toggleTitleAndMenu() {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
      if (!this.ifTitleAndMenuShow) {
        // 调用子组件的方法
        this.$refs.MenuBar.hideSetting();
      }
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + "px");
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.ebook {
  position: relative;

  .reader-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      display: flex;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
