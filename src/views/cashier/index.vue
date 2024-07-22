<template>
  <div class="cashier">
    <div v-if="payStatus === 'empty'" class="empty">
      <van-empty
        :image="emptyUrl"
        :image-size="[130, 90]"
        description="无待收款订单"
      />
    </div>
    <div class="pey-center">
      <template v-if="payStatus === 'keyboard'">
        <div class="keyboard">
          <h4 class="keyboard-title">请输入四位数字</h4>
          <van-password-input
            :value="value"
            :mask="false"
            :length="4"
            :gutter="'20px'"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
          <van-number-keyboard
            v-model="value"
            :show="showKeyboard"
            @blur="showKeyboard = false"
          />

          <van-button
            color="#751CBB"
            :disabled="disabled"
            block
            round
            style="margin-top: 56px"
            @click="submit"
          >
            确定
          </van-button>
        </div>
      </template>
      <template v-else-if="payStatus === 'paying'">
        <div class="paying">
          <p class="text">朱*然 152****1452</p>
          <p class="count-down">
            <span>支付剩余时间</span>
            <van-count-down :time="time" />
          </p>
          <h4 class="money">¥1,370.00</h4>
          <div
            class="pay-method"
            v-if="['wechat', 'alipay'].indexOf(platform) > -1"
          >
            <template v-if="platform === 'wechat'">
              <div class="left">
                <van-image width="24" height="24" src="src/assets/wechat.png" />
              </div>
              <div class="content">
                <p>微信支付</p>
                <span class="desc">使用微信支付</span>
              </div>
            </template>
            <template v-else-if="platform === 'alipay'">
              <div class="left">
                <van-image width="24" height="24" src="src/assets/alipay.png" />
              </div>
              <div class="content">
                <p>支付宝支付</p>
                <span class="desc">使用支付宝支付</span>
              </div>
            </template>
            <div class="right">
              <van-image width="20" height="20" src="src/assets/select.png" />
            </div>
          </div>
          <van-button
            color="#751CBB"
            block
            round
            class="pay-btn"
            :loading="loading"
            @click="submitPaid"
          >
            立即支付
          </van-button>
        </div>
      </template>
      <template v-else-if="payStatus === 'success'">
        <div class="success">
          <van-image width="52" height="52" src="src/assets/success.png" />
          <h4>支付成功</h4>
          <p class="text">朱*然 152****1452</p>
          <p class="text">支付宝付款 ¥1370.00</p>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts" name="cashier">
import { ref, watch } from "vue";
import { detectPlatform } from "./util";
const emptyUrl = ref<string>("src/assets/cashier-empty.png");

const value = ref<string>();
const showKeyboard = ref<boolean>(false);
const disabled = ref<boolean>(true);
const loading = ref<boolean>(false);
const platform = ref<string>("");

const payStatus = ref<"empty" | "keyboard" | "paying" | "success">("keyboard");

const time = ref<number>(30 * 60 * 60 * 1000);
const submit = () => {
  platform.value = detectPlatform();
  console.log("=========submit", value.value, platform.value);
  payStatus.value = "paying";
};

const submitPaid = () => {};

watch(value, val => {
  if (val) {
    if (val.length === 4) {
      console.info("----val", val);
    } else if (val.length > 4) {
      value.value = val.slice(0, 4);
    }
    disabled.value = !(val.length >= 4);
  }
});
</script>
<style lang="less">
::deep(.van-password-input) {
  width: 284px !important;
  .van-password-input__item {
    width: 56px;
    height: 56px;
    background: #ffffff;
    border: 2px solid #d9d9d9;
    border-radius: 2px;
  }
}
</style>
<style lang="less" scoped>
.cashier {
  height: calc(100% - 46px);
  .empty {
    height: 100%;
    padding-top: 200px;
  }
  .pey-center {
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;

    .keyboard {
      &-title {
        font-weight: 600;
        font-size: 16px;
        color: #212121;
        text-align: center;
        margin-bottom: 24px;
      }
      padding-top: 100px;
      width: 320px;
    }
    .paying {
      padding: 72px 15px 0 15px;
      width: 100%;
      position: relative;
      text-align: center;
      .text,
      .count-down {
        font-weight: 400;
        font-size: 14px;
        color: #636a74;
        &:first-child {
          margin-bottom: 8px;
        }
      }
      .count-down {
        display: flex;
        align-items: center;
        justify-content: center;
        .van-count-down {
          color: red;
          padding-left: 3px;
        }
      }
      .money {
        font-weight: 600;
        line-height: 36px;
        letter-spacing: 0;
        padding: 35px 0 70px 0;
      }
      .pay-method {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        background: #ffffff;
        border-radius: 8px;
        padding: 11px;
        cursor: pointer;
        .content {
          width: calc(100% - 48px);
          text-align: left;
          padding-left: 8px;
          p {
            font-weight: 600;
            font-size: 16px;
            color: #212121;
          }
          .desc {
            font-weight: 400;
            font-size: 14px;
            color: #9397a2;
          }
        }
        .right {
          display: flex;
          align-items: center;
        }
      }
      .pay-btn {
        position: absolute;
        bottom: 48px;
        width: calc(100% - 40px);
      }
    }
    .success {
      text-align: center;
      padding: 125px 0 10px 0;
      h4 {
        margin-bottom: 32px;
      }
      p.text {
        font-weight: 400;
        font-size: 14px;
        color: #212121;
      }
    }
  }
}
</style>
