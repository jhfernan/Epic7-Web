<template>
	<div>
		<v-navigation-drawer
			app
			clipped
			fixed
			left
			:mini-variant="$store.state.nav.minivariant"
			v-model="drawer">
			<v-list>
				<v-list-tile
					exact
					:key="i"
					router
					:to="item.to"
					v-if="!item.auth || $auth.user[item.auth] || $auth.user[item.secondaryAuth]"
					v-for="(item, i) in items"
				>
					<v-list-tile-action>
						<v-icon v-html="item.icon"></v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-text="item.title"></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar app dark fixed>
			<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
			<v-btn icon @click.stop="toggleMini">
				<v-icon v-html="$store.state.nav.minivariant ? 'chevron_right' : 'chevron_left'"></v-icon>
			</v-btn>
			<v-toolbar-title v-text="title"></v-toolbar-title>
			<v-spacer></v-spacer>
			<nuxt-link exact to="/home">
				<v-avatar color="primary" size="35px">
					<img :src="avatar" alt="avatar">
				</v-avatar>
			</nuxt-link>
			<v-btn flat @click="logout">
				Logout
			</v-btn>
		</v-toolbar>
	</div>
</template>

<script>
import util from '~/components/app/util'

export default {
	data () {
		return {
			avatar: util.avatar(this.$auth.user.email),
			drawer: true,
			items: [
				{ icon: 'account_circle', title: 'My Profile', to: '/home' },
				{ icon: 'supervised_user_circle', title: 'Manage Users', to: '/users', auth: 'admin' },
				{ icon: 'dashboard', title: 'Manage Heroes', to: '/heroes' },
			],
			title: 'Epic 7 Community'
		}
	},
	methods: {
		async logout () {
			await this.$auth.logout()
		},
		toggleMini () {
			this.$store.commit('nav/toggleMini')
		}
	},
}
</script>
