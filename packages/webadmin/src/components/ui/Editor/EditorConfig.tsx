import { Quill } from "react-quill";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import quillEmoji from "react-quill-emoji";

Quill.register({
    "formats/emoji": quillEmoji.EmojiBlot,
    "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
    "modules/emoji-shortname": quillEmoji.ShortNameEmoji
}, true);

export const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ script:  "sub" }, { script:  "super" }],
        [{ color: [] }, { background: [] }],
        // ["blockquote", "code-block"],
        ["blockquote"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        // [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ['emoji'],
        ["link", "image", "video"],
        ["clean"],
    ],
    'emoji-toolbar': true,
    // "emoji-textarea": true,
    "emoji-shortname": true,
}
