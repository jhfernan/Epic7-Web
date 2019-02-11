<template>
	<v-container fluid>
		<c-title :title="'Add a New Hero'">
			<template slot="lead">
				<v-btn class="mr-3" color="accent" exact fab small to="/heroes">
					<v-icon>first_page</v-icon>
				</v-btn>
			</template>
		</c-title>
		<v-form lazy-validation ref="form" v-model="valid">
			<v-container>
				<v-layout class="pt-3" row wrap>
					<v-flex xs12 md6>
						<v-text-field label="Name" :rules="util.rules.required" validate-on-blur v-model="form.name" />
					</v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs12 md4 d-flex>
						<v-select :items="starOptions" label="Stars" :rules="util.rules.required" v-model="form.stars" />
					</v-flex>
					<v-flex xs12 md4 d-flex>
						<v-select :items="classOptions" label="Class" v-model="form.class" />
					</v-flex>
					<v-flex xs12 md4 d-flex>
						<v-select :items="elementOptions" label="Element" v-model="form.element" />
					</v-flex>

					<v-flex class="pa-0" xs12><v-subheader>Scores</v-subheader></v-flex>
					<v-flex xs12 md3>
						<v-text-field label="Arena Score" v-model="score.arena" />
					</v-flex>
					<v-flex xs12 md3>
						<v-text-field label="Hunt Score" v-model="score.hunt" />
					</v-flex>
					<v-flex xs12 md3>
						<v-text-field label="Abyss Score" v-model="score.abyss" />
					</v-flex>
					<v-flex xs12 md3>
						<v-text-field label="Raid Score" v-model="score.raid" />
					</v-flex>
				</v-layout>
			</v-container>
			<v-toolbar class="no-toolbar-padding" color="transparent" dense flat>
				<v-btn class="mr-3" color="accent" exact to="/heroes">cancel</v-btn>
				<v-btn @click="clear">clear</v-btn>
				<v-spacer />
				<v-btn @click="submit" color="success" :disabled="!valid">submit</v-btn>
			</v-toolbar>
		</v-form>
	</v-container>
</template>

<script>
import util from '~/components/app/util.js'

export default {
	data () {
		return {
			classOptions: [
				{ text: 'Warrior', value: 'warrior' },
				{ text: 'Knight', value: 'knight' },
				{ text: 'Thief', value: 'thief' },
				{ text: 'Ranger', value: 'ranger' },
				{ text: 'Mage', value: 'mage' },
				{ text: 'Soul Weaver', value: 'soul weaver' }
			],
			elementOptions: [
				{ text: 'Ice', value: 'ice' },
				{ text: 'Fire', value: 'fire' },
				{ text: 'Earth', value: 'earth' },
				{ text: 'Dark', value: 'dark' },
				{ text: 'Light', value: 'light' }
			],
			form: {},
			score: {},
			starOptions: [
				{ text: '1', value: 1 },
				{ text: '2', value: 2 },
				{ text: '3', value: 3 },
				{ text: '4', value: 4 },
				{ text: '5', value: 5 }
			],
			util: util,
			valid: true
		}
	},
	head () {
		return {
			title: 'Add a Hero',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'This page is for members to create heroes' }
			]
		}
	},
	methods: {
		clear () {
			this.$refs.form.reset()
		},
		async submit () {
			if (this.$refs.form.validate()) {
				if (this.score) {
					this.form.score = this.score
				}
				await this.$axios.$post('/api/v1/heroes', this.form)
				.then(res => {
					this.$router.push(`/heroes/${res._id}`)
				})
				.catch(err => {
					this.util.catchErrors(err, 'There was an error during the creation process', this.$store)
				})
			}
		},
	},
	middleware: 'member',
}
</script>
