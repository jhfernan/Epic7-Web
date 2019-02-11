import Vue from "vue"

import Markdown from "vue-markdown"
import Profile from "~/components/app/profile.vue"
import Title from "~/components/app/titles.vue"

Vue.component("markdown", Markdown)
Vue.component("c-profile", Profile)
Vue.component("c-title", Title)
