<template>
	<div class="is-flex is-justify-content-center mt-5 mb-3">
		<figure class="image is-128x128 is-flex is-align-items-end" :style="{ background: `url(${user.avatar})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '15%' }">
			<div class="opa-4 clickable" @click="clickFileInput">
				<input type="file" hidden id="fileid" @change="updateAvatar">
				<fai icon="camera" color="#fff" class="is-size-3 is-fullwidth mt-2"></fai>
			</div>
		</figure>
	</div>
	<div class="is-flex is-justify-content-center">
		<h4 class="is-size-5">{{ user.email }}</h4>
	</div>
	<div class="tabs is-centered mt-3">
	  <ul>
	    <li :class="{'is-active': show.info }"><a @click="() => changeShow('info')">Info</a></li>
	    <li :class="{'is-active': show.tests }"><a @click="() => changeShow('tests')">My Tests</a></li>
	    <li :class="{'is-active': show.results }"><a @click="() => changeShow('results')">My Results</a></li>
	    <li :class="{'is-active': show.reports }"><a @click="() => changeShow('reports')">My Reports</a></li>
	  </ul>
	</div>
	<div>
		<ProfileInfo v-if="show.info"></ProfileInfo>
		<TestList v-if="show.tests"></TestList>
		<ResultList v-if="show.results"></ResultList>
	</div>
</template>

<script>
import useAuth from '../composition/useAuth'

import ProfileInfo from '../components/ProfileInfo'
import TestList from '../components/TestList'
import ResultList from '../components/ResultList'

export default {
	setup(){ return {...useAuth()} },
	methods: {
		updateAvatar(e){
			const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)

      reader.onload = () => {
        this.$store.dispatch("user/uploadImage", {
          file: {
            bytes: reader.result,
            name: file.name
          }, 
          onSuccess: (url) => {
            this.user.avatar = url
          }
        })
      }
		},
		clickFileInput(){
			document.getElementById("fileid").click()
		},
		changeShow(v){
			Object.keys(this.show).forEach(key => {
				this.show[key] = false
				if(key == v) this.show[key] = true
			})
		}
	},
	created(){
		this.$store.dispatch("test/getMyTests")
		this.$store.dispatch("result/getMyResults")
	},
	data(){ return {
		show: {
			info: true,
			tests: false,
			results: false,
			reports: false
		}
	} },
	components: {
		ProfileInfo,
		TestList,
		ResultList
	}
}
</script>

<style>
	.opa-4 {
		background: #222;
		opacity: .0;
		width: 100%;
		height: 48px;
		border-radius: 0 0 20px 20px;
		transition: opacity 1s;
	}

	.opa-4:hover {
		opacity: .4;
	}

	.is-fullwidth {
		width: 100%!important;
	}

	.hr {
		border-bottom: 3px solid #57CC99;
		opacity: .6;
	}
</style>