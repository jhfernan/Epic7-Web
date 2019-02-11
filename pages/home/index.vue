<template>
	<v-container>
		In the Home
	</v-container>
</template>

<script>
export default {
	head () {
		return {
			title: 'Home Page',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Your User Home Page' }
			]
		}
	},
	middleware: 'member',
}
</script>
