<template>
	<div>
		<video id="war_video" autoplay="" loop="" muted="muted" volume="0" playsinline="" webkit-playsinline="">
			<source src="/content/bg1.mp4" type="video/mp4">
			<source src="/content/bg1.webm" type="video/webm">
		</video>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	head() {
		return {
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Just a fan creation for Epic 7 for anyone interested in numbers, tier lists, and testing'
				}
			]
		};
	},
	middleware: 'guest'
}
</script>
