<template>
	<v-container fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md6 lg4>
				<v-card>
					<v-toolbar color="primary" dark dense>
						<v-toolbar-title>Login</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-alert class="mb-3" :value="err" type="error">
							{{ err }}
						</v-alert>
						<v-form @submit.prevent="login">
							<v-text-field prepend-icon="person" label="Username" type="text" v-model="form.username"></v-text-field>
							<v-text-field prepend-icon="lock" label="Password" type="password" v-model="form.password"></v-text-field>
							<div class="text-xs-right">
								<v-btn @click="login" color="primary" type="submit">Login</v-btn>
							</div>
						</v-form>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data () {
		return {
			err: null,
			form: {},
		}
	},
	head () {
		return {
			title: 'Log In',
			meta: [
				{ hid: 'description', name: 'description', content: 'Login portal for our community' }
			]
		}
	},
	methods: {
		async login() {
			try {
				await this.$auth.loginWith('local', { data: this.form })
			} catch (err) {
				err.response
					? this.err = `Error ${err.response.data.status}: ${err.response.data.message}`
					: this.err = 'There was an error during the log in process'
			}
		},
	},
	middleware: 'guest'
}
</script>
