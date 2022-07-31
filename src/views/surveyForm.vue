<template>
<h1>{{surveyName}}</h1>
<h4>{{ surveyDescription }}</h4>
<v-form v-for="(que, i) in QuestionDetails" :key="i">

<v-row>
  <v-text-field class="font-class-name" outlined dense>{{que.surveyquestion_text}}</v-text-field>
</v-row>
  <template v-for="(option,oid) in que.surveyquestion_answer" :key="oid">

    <label v-if="que.surveyquestion_type=='mcq'">
      <input type="radio" :value="option" v-model="responses[que.id]" />&nbsp&nbsp
      <span>{{ option }}</span><br>
    </label>

    <label v-if="que.surveyquestion_type=='checkbox'">
      <input type="checkbox" :value="option" v-model="checked" @click="check($event,que.id)" />&nbsp&nbsp
      <span>{{ option }}</span><br>
    </label>

    <v-text-field v-if="que.surveyquestion_type=='description'" label="Please add your response here" v-model="desc[que.id]" />


<v-rating v-if="que.surveyquestion_type=='slider'"
      v-model="rating[que.id]"
      :length="length"
      color="red lighten-3"
      background-color="grey lighten-1"
      large
    ></v-rating><br>

    <v-slider v-if="que.surveyquestion_type=='slider'"
    v-model="val[que.id]"
          label="thumb-color"
          thumb-color="red"
          thumb-label="always"
></v-slider>

  </template><br>






</v-form><br><br>
<v-row justify="center">
  <v-btn @click="submitForm" style="background: #6495ED; width:20%;">Submit</v-btn>


</v-row>
</template>



<script>
import TutorialDataService from "../services/TutorialDataService";
import axios from "axios";

import { baseurl } from "../http-common"
export default {
  name: "add-tutorial",
  data() {
    return {
      val:{},
      length: 10,
      rating: {},
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
      message: "Enter data and click save",
      surveyId: '',
      finalArray: []
    };
  },
  mounted() {
    this.surveyId = this.$route.query.surveyId
    this.displayQuestions()
  },
  methods: {
    check(event, qid) {
      let values = [];
      if (event.target.checked) {
        console.log(event.target.value, qid, "checkkkkkkkkkkkkkkkkkkkkk")
        if (this.finalArray.length > 0) {
          console.log(111111111111111111111)

          let vart = this.finalArray.findIndex(p => p.questionId == qid);

          if (vart != -1) {
            this.finalArray[vart].ans.push(event.target.value)
          } else {
            this.finalArray.push({
              questionId: qid,
              ans: [event.target.value]
            })
          }

        } else {
          console.log(3333333333333333333333333333333)
          this.finalArray.push({
            questionId: qid,
            ans: [event.target.value]
          })
        }


      } else {
        console.log(this.finalArray, "]]]]]]]]]]]]]]]")
        if (this.finalArray.length > 0) {

          let vart = this.finalArray.findIndex(p => p.questionId == qid);
          console.log(vart, "vartttttttttttttttttttttttttttttttttttt")
          if (vart != -1) {
            console.log(this.finalArray[vart].ans.length, "this.finalArray[vart].ans.lengththis.finalArray[vart].ans.lengththis.finalArray[vart].ans.lengththis.finalArray[vart].ans.length")
            if (this.finalArray[vart].ans.length > 1) {
              console.log("YESSSSSSSSSSSSSSSSSSSSs")
              this.finalArray[vart].ans.splice(this.finalArray[vart].ans.indexOf(event.target.value), 1)
            } else {
              console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
              this.finalArray.splice(vart, 1)
            }
          }
        }

      }
      console.log(this.finalArray)


    },



    submitForm() {
      for (const key in this.responses) {
        this.finalArray.push({
          questionId: Number(key),
          ans: this.responses[key]
        });
      }
      for (const key in this.desc) {
        this.finalArray.push({
          questionId: Number(key),
          ans: this.desc[key]
        });
      }
      for (const key in this.val) {
        this.finalArray.push({
          questionId: Number(key),
          ans: this.val[key]
        });
      }
      var data = JSON.stringify(this.finalArray)
            console.log(data)
      var config = {
        method: 'post',
        url: baseurl+'surveyparticipantsanswer/createSurveyParticipantAns',
        headers: {
          'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
          'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2',
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
          alert(response.data.resultMessage)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    displayQuestions() {
      var data = JSON.stringify({
        "surveyId": this.surveyId
      });

      var config = {
        method: 'post',
        url: baseurl+'surveydetails/surveyDetailsBySurveyId',
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

input[type="radio"] {
    cursor: pointer;
}

input[type="checkbox"] {
    cursor: pointer;
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
