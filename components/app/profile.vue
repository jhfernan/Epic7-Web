<template>
	<v-card>
		<v-btn absolute block disabled flat style="height: 100px;" top>
			<v-avatar class="elevation-4" size="100">
				<v-img class="avatar-border" :src="util.avatar(user.email, 100)" />
			</v-avatar>
		</v-btn>
		<v-card-title class="pb-0 card-float" primary-title>
			<v-spacer />
			<h1 class="text-capitalize">{{ user | fullName }}</h1>
			<v-spacer />
		</v-card-title>
		<v-card-text class="pt-0 text-xs-center">
			<nuxt-link :to="`/members/${user.username}`" v-if="mailto">
				<h3>@{{ user.username }}</h3>
			</nuxt-link>
			<a :href="`mailto:${user.email}`" v-else>
				<h3>{{ user.email }}</h3>
			</a>
			<div class="pt-2 subheading grey--text">
				<markdown v-if="user.about">{{ user.about }}</markdown>
				<p v-else>No "about me" has been added at the moment</p>
			</div>
		</v-card-text>
		<v-divider v-if="mailto"/>
		<v-card-text class="grey grey--text lighten-4" v-if="mailto">
			<div class="text-xs-center">
				Your profile picture is maintained by <a href="https://en.gravatar.com/" target="_blank">Gravatar</a>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
import markdown from "vue-markdown";
import util from "~/components/app/util.js";

export default {
	components: { markdown },
	data() {
		return { util: util };
	},
	props: ["mailto", "user"]
};
</script>
