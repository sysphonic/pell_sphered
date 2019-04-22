
var acceptableLangs = ["en", "ja"];
var lang = getLang();
if (acceptableLangs.indexOf(lang) >= 0) {
  setNessieLocale(lang);
}

var pell_t_h = {
  "app.title":
    {
      en: "YOUR APPNAME",
      ja: "YOUR APPNAME"
    },
  "btn.ok":
    {
      en: "OK",
      ja: "OK"
    },
  "btn.cancel":
    {
      en: "Cancel",
      ja: "キャンセル"
    },
  "btn.close":
    {
      en: "Close",
      ja: "閉じる"
    },
  "action.bold":
    {
      en: "Bold",
      ja: "太字"
    },
  "action.italic":
    {
      en: "Italic",
      ja: "斜体"
    },
  "action.underline":
    {
      en: "Underline",
      ja: "下線"
    },
  "action.strike_through":
    {
      en: "Strike-through",
      ja: "取消線"
    },
  "action.heading1":
    {
      en: "Heading 1",
      ja: "見出し１"
    },
  "action.heading2":
    {
      en: "Heading 2",
      ja: "見出し２"
    },
  "action.paragraph":
    {
      en: "Paragraph",
      ja: "段落"
    },
  "action.quote":
    {
      en: "Quote",
      ja: "引用"
    },
  "action.ordered_list":
    {
      en: "Ordered List",
      ja: "箇条書き（番号）"
    },
  "action.unordered_list":
    {
      en: "Unordered List",
      ja: "箇条書き（・）"
    },
  "action.code":
    {
      en: "Code",
      ja: "コード"
    },
  "action.horz_line":
    {
      en: "Horizontal Line",
      ja: "水平線"
    },
  "action.link":
    {
      en: "Link",
      ja: "リンク"
    },
  "action.image":
    {
      en: "Image",
      ja: "画像"
    },
  "action.forecolor":
    {
      en: "Font color",
      ja: "文字色"
    },
  "action.bgcolor":
    {
      en: "Background color",
      ja: "背景色"
    },
  "msg.enter_link_url":
    {
      en: "Enter the link URL",
      ja: "リンク先URLを入力してください。"
    },
  "msg.enter_image_url":
    {
      en: "Enter the image URL",
      ja: "画像のURLを入力してください。"
    }
};

t_merge(pell_t_h);

