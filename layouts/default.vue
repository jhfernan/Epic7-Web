<template>
	<v-app>
		<navigation />
		<v-content>
			<nuxt/>
		</v-content>
	</v-app>
</template>

<script>
import navigation from "~/components/navigation.vue";

export default {
	components: { navigation }
};
</script>
