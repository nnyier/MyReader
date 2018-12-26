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
              @setFontSize="setFontSize"></menu-bar>
  </div>
</template>

<script>
import TitleBar from "../views/TitleBar";
import MenuBar from "../views/MenuBar";
import Epub from "epubjs";
const DOWNLOAD_URL = "/2018_Book_AgileProcessesInSoftwareEngine.epub";

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
      defaultFontSize: 14
    };
  },
  mounted() {
    this.showEpub();
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
