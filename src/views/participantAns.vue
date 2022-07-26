<template>
<h2 style="text-align:center;color: #4CAF50;">Survey Report</h2><br>
<v-form>
<template v-for="(que, i) in QuestionDetails" :key="i">

  <v-row><h3>{{i+1}})</h3>&nbsp&nbsp<h3>{{que.surveyquestion_text}}</h3></v-row><br>


  <table>
  <thead>
        <tr>
          <th class="text-left">
            Answer
          </th>
          <th class="text-left">
            Percentage
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(option,oid) in que.questionAns"
          :key="oid"
        >
          <td>{{ option.surveyparticipantanswer_text }}</td>
          <td>{{ option.percentage }}%</td>
        </tr>
      </tbody>
  </table><br><br>








</template>
<v-card-text>
<v-row justify="center">
<v-btn btn style="background: #6495ED;" onclick="window.print();" dark>Download</v-btn>
</v-row>
</v-card-text>
</v-form>

</template>



<script>
import TutorialDataService from "../services/TutorialDataService";
import axios from "axios";
export default {
  name: "add-tutorial",
  data() {
    return {
    headers:["answer","percentage"],
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
    displayQuestions() {

      var config = {
        method: 'GET',
        url: 'http://localhost:9005/api/surveyparticipantsanswer/getSurveyParticipantAnswers?surveyId='+this.$route.query.surveyId,
        headers: {
          'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
          'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2',
          'Content-Type': 'application/json'
        }
      };

      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.QuestionDetails=response.data.responseData
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
.v-main__wrap h4 {
  margin-bottom: 18px;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 15px;
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
