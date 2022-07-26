<template>
<h1>{{surveyName}}</h1>
<h4>{{ surveyDescription }}</h4>
<v-form v-for="(que, i) in QuestionDetails" :key="i">


  <v-text-field class="font-class-name" outlined dense>{{que.surveyquestion_text}}</v-text-field>

  <template v-for="(option,oid) in que.surveyquestion_answer" :key="oid">

    <label v-if="que.surveyquestion_type=='mcq'" disabled>
      <input type="radio" :value="option" v-model="responses[que.id]" disabled/>&nbsp&nbsp
      <span>{{ option }}</span><br>
    </label>

    <label v-if="que.surveyquestion_type=='checkbox'" disabled>
      <input type="checkbox" :value="option" v-model="checked" @change="check($event,que.id)" disabled/>&nbsp&nbsp
      <span>{{ option }}</span><br>
    </label>

    <v-text-field disabled v-if="que.surveyquestion_type=='description'" label="Please add your response here" v-model="desc[que.id]" />
  </template><br>








</v-form>
</template>



<script>
import TutorialDataService from "../services/TutorialDataService";
import axios from "axios";
export default {
  name: "add-tutorial",
  data() {
    return {
      responses: {},
      picked: [],
      QuestionDetails: [],
      optionDetails: [],
      desc: {},
      qId: [],
      result: [],
      checked: [],
      surveyName: '',
      surveyDescription: '',
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      arr: [],
      temp: [],
      items: ['Market Research Survey', 'Customer Feedback Survey', 'Product Feedback Survey'],
      message: "Enter data and click save"
    };
  },
  mounted() {
    this.displayQuestions()
  },
  methods: {
    check(event, item) {

      //  this.responses[i]=this.checked.join(",")


    },
    displayQuestions() {

      var data = JSON.stringify({
        "surveyId": this.$route.query.surveyId
      });

      var config = {
        method: 'post',
        url: 'http://localhost:9005/api/surveydetails/surveyDetailsBySurveyId',
        headers: {
          'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
          'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2',
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.surveyName = response.data.SurveyDetails[0].survey_name
          this.surveyDescription = response.data.SurveyDetails[0].survey_description
          this.QuestionDetails = response.data.QuestionDetails
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({
        name: 'tutorials'
      });
    }
  }
}
</script>
<style>
.font-class-name * {
  font-size: 24px;
  font-color: black !important;
  font-weight: bold;
  border-color: black !important
}

.v-main__wrap h4 {
  margin-bottom: 18px;
}


form button.v-btn {
  border: 2px solid;
  margin-bottom: 27px;
  font-size: 18px;
  border-radius: 0;
  padding: 7px 18px;
  color: #000 !important;
  height: unset;
  background-color: #fff !important;
}
</style>
