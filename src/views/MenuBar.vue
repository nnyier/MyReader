<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper"
           :class="{'hide-box-shadow': ifSettingShow || !ifTitleAndMenuShow}"
           v-show="ifTitleAndMenuShow">
        <div class="icon-wrapper">
          <div class="icon-menu icon"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-progress icon"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-bright icon"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-a icon"
               @click="showSetting">A</div>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper"
           v-show="ifSettingShow">
        <div class="setting-font-size">
          <!-- 从字体大小数组中 取最大字体和最小字体 -->
          <div class="preview"
               :style="{fontSize:fontSizeList[0].fontSize+'px'}">A</div>
          <div class="select">
            <div class="select-wrapper"
                 @click="setFontSize(item.fontSize)"
                 v-for="(item,index) in fontSizeList"
                 :key="index">
              <div class="line"></div>
              <div class="pointer-wrapper">
                <div class="pointer"
                     v-show="defaultFontSize === item.fontSize">
                  <div class="small-pointer"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>

          <div class="preview"
               :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      ifSettingShow: false
    };
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number
  },
  methods: {
    setFontSize(fontSize) {
      // 向父组件传递事件
      this.$emit("setFontSize", fontSize);
    },
    showSetting() {
      this.ifSettingShow = true;
    },
    hideSetting() {
      this.ifSettingShow = false;
    }
  },
  watch: {
    innerWith() {}
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    background: #fff;
    width: 100%;
    height: px2rem(48);
    display: flex;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    display: flex;
    // 添加同级属性 &表示menu-wrapper与hide-box-shadow同级
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(28);
      }
      .icon-bright {
        font-size: px2rem(24);
      }
    }
  }
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    width: 100%;
    z-index: 101;
    height: px2rem(60);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        align-items: center;
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .pointer-wrapper {
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            position: relative;
            .pointer {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              background: #ffffff;
              border-radius: 50%;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 0 px2rem(8) rgba(0, 0, 0, 0.15);
              @include center;
              .small-pointer {
                width: px2rem(5);
                height: px2rem(5);
                border-radius: 50%;
                background: #000;
              }
            }
          }
        }
      }
    }
  }
}
</style>
