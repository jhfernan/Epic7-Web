<template>
	<div>
		<v-container fluid>
			<c-title class="mb-3" right :title="hero.name">
				<template slot="lead">
					<v-btn class="mr-3" color="accent" exact fab small to="/heroes">
						<v-icon>first_page</v-icon>
					</v-btn>
				</template>
				<template slot="trail">
					<div class="e7-icons ml-2">
						<span :class="hero.element"></span>
						<span :class="hero.class.replace(/\s+/g, '-')"></span>
					</div>
				</template>
				<template slot="end">
					<h2 class="title">{{ nextChamp().name }}</h2>
					<v-btn class="ml-3" color="accent" exact fab small :to="`/heroes/${nextChamp()._id}`">
						<v-icon>last_page</v-icon>
					</v-btn>
				</template>
			</c-title>
		</v-container>

		<v-container>
			<v-layout justify-center>
				<v-flex xs10 sm8 md6 lg4>
					<v-img :src="`/heroes/portrait/${hero.name.replace(/\s+/g, '-').toLowerCase()}.png`" />
					<v-layout row>
						<v-flex class="text-xs-center title" :key="rank" v-for="rank in ['arena', 'hunt', 'abyss', 'raid']" xs3>
							<h3 class="text-capitalize my-2">{{ rank }}</h3>
							<p :class="color(hero.score[rank])">{{ hero.score[rank] }}</p>
						</v-flex>
					</v-layout>
					<div v-if="hero.recommended">
						<h3>Recommended Sets</h3>
						<markdown class="subheading" v-if="hero.recommended.sets">{{ hero.recommended.sets }}</markdown>
					</div>
					<div class="text-xs-center" v-else>
						<h3>Recommended Sets not added yet</h3>
					</div>
				</v-flex>
			</v-layout>
			<v-divider class="my-4" />
			<v-layout class="text-xs-center" row wrap>
				<v-flex xs12 md5>
					<h3 class="mb-2">Max Stats</h3>
					<template v-if="hero.max">
						<p class="mb-0 subheading" :key="`max${stat}`" v-for="(stat, i) in stats">
							<strong>{{ stat }}</strong>
							<span v-if="!showRank">: {{ `${hero.max[stat]}${i > 4 ? '%' : ''}` }}</span>
							<span v-else>: ({{ getRank('max', stat, hero.max[stat]) }}%) - {{ getFrequency('max', stat, hero.max[stat]) }}</span>
							<span v-if="showRank"> out of {{ getHeroes('max', stat).length }}</span>
						</p>
					</template>
				</v-flex>
				<v-flex xs12 md5>
					<h3 class="mb-2">Max Awakened Stats</h3>
					<template v-if="hero.maxAwakened">
						<p class="mb-0 subheading" :key="`max${stat}`" v-for="(stat, i) in stats">
							<strong>{{ stat }}</strong>
							<span v-if="!showRank">: {{ `${hero.maxAwakened[stat]}${i > 4 ? '%' : ''}` }}</span>
							<span v-else>: ({{ getRank('maxAwakened', stat, hero.maxAwakened[stat]) }}%) - {{ getFrequency('maxAwakened', stat, hero.maxAwakened[stat]) }}</span>
							<span v-if="showRank"> out of {{ getHeroes('maxAwakened', stat).length }}</span>
						</p>
					</template>
				</v-flex>
				<v-flex xs12 md2>
					<v-btn-toggle dark v-model="showRank">
						<v-btn flat :value="false">
							Show Stats
						</v-btn>
						<v-btn flat :value="true">
							Show Rankings
						</v-btn>
					</v-btn-toggle>
				</v-flex>
			</v-layout>
			<div class="mt-3 text-xs-center" v-if="!hero.max && !hero.maxAwakened">
				<h3>No stats added at the moment</h3>
			</div>
			<v-divider class="my-3" />

		</v-container>

		<v-dialog max-width="1200" v-model="dialog">
			<v-card>
				<v-card-title class="headline pb-0">Update Stats</v-card-title>
				<v-card-text class="pt-0">
					<v-form lazy-validation ref="form" @submit.prevent="updateStats" v-model="valid">
						<v-container grid-list-lg>
							<v-layout row wrap>
								<v-flex xs6>
									<h3>Max Stats</h3>
									<template v-for="stat in stats">
										<v-text-field :key="`max${stat}`" :label="stat" type="number" v-model="form.max[stat]" />
									</template>
								</v-flex>
								<v-flex xs6>
									<h3>Max Awakened Stats</h3>
									<template v-for="stat in stats">
										<v-text-field :key="`maxAwakened${stat}`" :label="stat" type="number" v-model="form.maxAwakened[stat]" />
									</template>
								</v-flex>
							</v-layout>
						</v-container>
						<v-toolbar color="transparent" flat>
							<v-btn @click="dialog = false">Cancel</v-btn>
							<v-spacer></v-spacer>
							<v-btn @click="updateStats" color="accent" type="submit">
								Update Stats
							</v-btn>
						</v-toolbar>
					</v-form>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog max-width="700" v-model="dialog2">
			<v-card>
				<v-card-title class="headline">Update Scores and Sets</v-card-title>
				<v-card-text>
					<v-form lazy-validation ref="form" @submit.prevent="updateSS" v-model="valid">
						<v-text-field label="Arena" type="number" v-model="form2.score.arena" />
						<v-text-field label="Hunt" type="number" v-model="form2.score.hunt" />
						<v-text-field label="Abyss" type="number" v-model="form2.score.abyss" />
						<v-text-field label="Raid" type="number" v-model="form2.score.raid" />

						<v-textarea label="Recommended Sets" rows="3" v-model="form2.recommended.sets" />
						<v-toolbar color="transparent" flat>
							<v-btn @click="dialog2 = false">Cancel</v-btn>
							<v-spacer></v-spacer>
							<v-btn @click="updateSS" color="accent" type="submit">
								Update Scores and Sets
							</v-btn>
						</v-toolbar>
					</v-form>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-footer app class="pa-4" fixed inset>
			<v-spacer></v-spacer>
			<v-btn @click="dialog2 = true" color="accent">Update Scores and Sets</v-btn>
			<v-btn @click="dialog = true" color="accent">
				{{ hero.max && hero.maxAwakened ? 'Update Stats' : 'Add Stats' }}
			</v-btn>
		</v-footer>
	</div>
</template>

<script>
import computations from '~/components/app/computations.js'
import util from '~/components/app/util.js'

export default {
	asyncData ({ app, error, params }) {
		return app.$axios.$get('/api/v1/heroes/')
			.then(res => {
				return {
					hero: res.find(hero => hero._id == params.id),
					heroes: res,
					statRanking: computations.percentileRanking,
				}
			})
			.catch(err => { error({ statusCode: '404', message: 'Hero info not found' }) })
	},
	data () {
		return {
			dialog: false,
			dialog2: false,
			form: {
				max: {},
				maxAwakened: {}
			},
			form2: {
				recommended: {},
				score: {}
			},
			showRank: false,
			stats: [
				'cp',
				'attack',
				'health',
				'speed',
				'defense',
				'critChance',
				'critDamage',
				'dualChance',
				'effectiveness',
				'effectResist'
			],
			valid: true,
		}
	},
	head () {
		return {
			title: `Question details: ${this.hero.name}`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `${this.hero.name} info page for members`,
				}
			]
		}
	},
	methods: {
		color (score) {
			return util.color(score)
		},
		getFrequency (level, statType, stat) {
			let array = this.getHeroes(level, statType)
			return computations.scoreFrequency(array, stat)
		},
		getHeroes (level, statType) {
			let array = Array.from(this.heroes, h => h[level] ? h[level][statType] : -1)
			array = array.filter(v => v != -1)
			return array
		},
		getRank (level, statType, stat) {
			let array = this.getHeroes(level, statType)
			return (computations.percentileRanking(array, stat)).toFixed(0)
		},
		nextChamp () {
			let index = this.heroes.findIndex(x => x._id == this.hero._id)
			let nextIndex = (index + 1) < this.heroes.length ? index + 1 : 0
			return this.heroes[nextIndex]
		},
		async updateSS () {
			await this.$axios.$put(`/api/v1/heroes/${this.hero._id}`, this.form2)
			.then(res => {
				this.hero = res
				this.form2 = { recommended: {}, score: {} }
				this.dialog2 = false
			})
			.catch(err => { this.util.catchErrors(err, 'There was an error trying to update the scores and sets', this.$store) })
		},
		async updateStats () {
			await this.$axios.$put(`/api/v1/heroes/${this.hero._id}`, this.form)
			.then(res => {
				this.hero = res
				this.form = { max: {}, maxAwakened: {} }
				this.dialog = false
			})
			.catch(err => { this.util.catchErrors(err, 'There was an error trying to update the stats', this.$store) })
		}
	},
	// middleware: 'member',
}
</script>
