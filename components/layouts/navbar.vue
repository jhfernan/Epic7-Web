<template>
	<div>
		<v-toolbar app color="primary" clipped-right dense fixed dark>
			<v-btn class="hidden-md-and-down" exact flat :key="i" nuxt router :to="link.to" v-for="(link, i) in links">
				{{ link.name }}
			</v-btn>
			<v-spacer />
			<v-toolbar-title>Epic 7 Community</v-toolbar-title>
			<v-spacer />
			<v-btn class="hidden-md-and-down" exact flat :key="link.name" nuxt router :to="link.to" v-for="link in linksTwo">
				{{ link.name }}
			</v-btn>
			<v-toolbar-side-icon class="hidden-lg-and-up" @click.native.stop="drawer = !drawer" />
		</v-toolbar>
		<v-navigation-drawer app class="hidden-lg-and-up" clipped fixed right v-model="drawer">
			<v-list>
				<v-list-tile exact :key="link.name" nuxt router :to="link.to" v-for="link in allLinks">
					<v-list-tile-title>{{ link.name }}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
export default {
	computed: {
		allLinks() {
			return this.links.concat(this.linksTwo);
		}
	},
	data() {
		return {
			drawer: false,
			links: [
				{ name: "Home", to: "/" },
				{ name: "Hero Ranking", to: "/heroes" }
			],
			linksTwo: [
				// { name: "About", to: "/about" },
				// { name: "Support Us", to: "/support" },
				{ name: "Login", to: "/login" }
			]
		};
	}
};
</script>
