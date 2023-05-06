<script setup lang="ts">
import TheaterButton from "./TheaterButton.vue";

const handleClick = () => {
  console.log("event dispatched");
  window.dispatchEvent(
    new CustomEvent("InjectScenario", {
      detail: {
        title: "同棲３年目のカップルあるある",
        items: [
          {
            rank: 10,
            title: "掃除当番争い",
            description: "掃除の当番決めでいつも言い合いに",
            url: "https://placehold.jp/300x300.png",
          },
          {
            rank: 9,
            title: "食材管理係",
            description: "買い物忘れるな！常備食の番人だよ",
            url: "https://placehold.jp/300x300.png",
          },
          {
            rank: 8,
            title: "トイレットペーパー戦争",
            description: "紙切れ？誰の責任だよ！",
            url: "https://placehold.jp/300x300.png",
          },
          {
            rank: 7,
            title: "恋愛ドラマの選択肢",
            description: "どっちを見る？選ぶのは戦いだぜ",
            url: "https://placehold.jp/300x300.png",
          },
          {
            rank: 6,
            title: "お互いの寝言ネタ",
            description: "夜中に話す？寝言の謎を追及しよう",
            url: "https://placehold.jp/300x300.png",
          },
          {
            rank: 5,
            title: "休日の過ごし方協議",
            description: "外に出る？家でまったり？揉めるね",
            url: "https://placehold.jp/300x300.png",
          },
          {
            rank: 4,
            title: "デリバリーの選択権",
            description: "今夜はどこのピザ？え、寿司？",
            url: "https://placehold.jp/300x300.png",
          },
          {
            rank: 3,
            title: "観葉植物の命名権",
            description: "植物の名前もめたら親バカだな",
            url: "https://placehold.jp/300x300.png",
          },
          {
            rank: 2,
            title: "お風呂の順番決め",
            description: "先に入る？後に入る？毎日の駆け引き",
            url: "https://placehold.jp/300x300.png",
          },
          {
            rank: 1,
            title: "クッション取り合い",
            description: "ソファーのクッション奪い合い大戦",
            url: "https://placehold.jp/300x300.png",
          },
        ],
      },
    })
  );
};
</script>

<template>
  <TheaterButton @click="handleClick">Dispatch</TheaterButton>
</template>

<style scoped>
button {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 16px;
  transition: all 0.3s ease;
}
</style>
