<template>
	<section>
		<navbar v-if="!$auth.loggedIn" />
		<backbar v-else />
		<v-snackbar top right v-model="$store.state.snack.available">
			{{ $store.state.snack.text }}
			<v-btn flat color="grey" @click.native="$store.dispatch('snack/toggleSnack')">Close</v-btn>
		</v-snackbar>
	</section>
</template>

<script>
import backbar from "~/components/layouts/backbar";
import navbar from "~/components/layouts/navbar";

export default {
	components: { backbar, navbar }
};
</script>
