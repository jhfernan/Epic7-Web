<template>
	<v-toolbar class="no-toolbar-padding" color="transparent" dense flat>
		<slot name="lead"></slot>
		<v-spacer v-if="center" />
		<h1 class="headline text-capitalize">{{ title }}</h1>
		<v-spacer v-if="centerTrail" />
		<slot name="trail"></slot>
		<v-spacer v-if="right || centerTrail" />
		<slot name="end"></slot>
	</v-toolbar>
</template>

<script>
export default {
	props: {
		center: {
			type: Boolean,
			default: false
		},
		centerTrail: {
			type: Boolean,
			default: false
		},
		right: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: "The title of our header"
		}
	}
};
</script>
