<template>
<ins class="adsbygoogle"
:style="adStyle"
         :data-ad-client="adClient"
         :data-ad-format="adFormat"
         :data-ad-slot="adSlot"
        :data-full-width-responsive="true"></ins>
</template>

<script>

    export default{
        props: {
        adStyle: {
            type: String,
            required: false,
            default: "display:block",
        },
        adClient: {
            type: String,
            required: false,
            default: "ca-pub-5659080879346264",
        },
        adFormat: {
            type: String,
            required: false,
            default: "auto",
        },
        adSlot: {
            type: String,
            required: false,
            default: "9823128209",
        },
    },

            mounted(){
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
    }
</script>