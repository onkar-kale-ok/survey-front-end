<template>
<h1>Add Survey</h1>
<h4>{{ message }}</h4>
<v-form>
  <v-text-field label="Survey Name" v-model="tutorial.title" />
  <v-text-field label="Survey Description" v-model="tutorial.description" />
  <v-select :items="items" filled label="Survey Type" v-model="tutorial.type"></v-select>
  <v-text-field name="startDate" label="Start Date (mm/dd/yy)" type="date" v-model="startDate"></v-text-field>
  <v-text-field name="endDate" label="End Date (mm/dd/yy)" type="date" v-model="endDate"></v-text-field>

  <v-row justify="center">
    <v-col col="2"> </v-col>
    <v-col col="2"> </v-col>
  </v-row>
  <v-card-text>
  <h4>Question Details</h4>

  <v-form v-for="(que, i) in QuestionDetails" :key="i">


    <v-text-field :label="'Question '+[i+1]" v-model="que.surveyquestion_text"  outline></v-text-field>
    <v-select :items="quesarray" filled label="Question Type" v-model="que.surveyquestion_type" :value="que.surveyquestion_type"></v-select>
    <v-btn style="width:100%" color="info" @click="add(i)" v-if="que.surveyquestion_type=='mcq' || que.surveyquestion_type=='checkbox'">add options</v-btn>
    <template v-for="(option,oid) in que.surveyquestion_answer" :key="oid">

    <v-row v-if="que.surveyquestion_type=='mcq'">
      <v-radio></v-radio>
      <v-text-field v-model="que.surveyquestion_answer[oid]"></v-text-field>
      &nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp
      <v-btn class="remove" @click="removeParents($event,i,oid);">X</v-btn>
    </v-row>

    <v-row v-if="que.surveyquestion_type=='checkbox'">
      <v-checkbox></v-checkbox>
      <v-text-field v-model="que.surveyquestion_answer[oid]"></v-text-field>
      &nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp
      <v-btn class="remove" onclick="return this.parentNode.remove();">X</v-btn>
    </v-row>
    </template>
    <v-btn @click="removeQ(i)" class="error">DElete</v-btn>


  </v-form>
    <v-row align="end" justify="center">
      <v-btn @click="addQ" class="primary">add question</v-btn>&nbsp&nbsp
      <v-btn @click="updateData" style="background: #6495ED; width:20%;">Update</v-btn>

    </v-row>
    <v-card-text>
      <v-text-field label="Add more participants seperated by comma" v-model="participants"></v-text-field>
      <v-btn @click="addParticipants">Add participants</v-btn>
      </v-card-text>

  </v-card-text>
</v-form>
</template>



<script>
import axios from "axios";
import Datepicker from 'vue3-datepicker'
import moment from 'moment'
import WebStorageCache from 'web-storage-cache'

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      items: ['Market Research Survey', 'Customer Feedback Survey', 'Product Feedback Survey'],
      quesArray: [],
      quesarray: ['description', 'checkbox', 'mcq'],
      message: "Enter data and click save",
      flag: false,
      active: 1,
      radioGroup: "",
      array: ["test", "tool"],
      qtype: '',
      test: "",
      surveyId: 0,
      qName: '',
      startDate: '',
      endDate: '',
      textFields: [{
        label1: "Question 1",
        value1: "",
        inputs: [],
        qtype: []
      }],
      participants: '',
      participantsFlag:false,
      queSaveButton:true,
      surveySaveButton:true,

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
      option:[],
      surveyquestion_answer:[],
      newQues:[],
      userId:''
    };
  },
  mounted() {
    this.displayQuestions()
    var cache = new WebStorageCache();
    console.log(cache.get('userId'),"=================================================================")
    this.userId=cache.get('userId');
  },
  methods: {
  addParticipants() {
  console.log(this.participants);
  let sp=this.participants.split(",")
  console.log(sp,"++++++++")
    var data = JSON.stringify({
      "surveyParticipantsEmail": sp,
      "surveyId": this.surveyId
    });
    console.log(data,"data&&&&&&&&&&&&&&&&&&&&&&&&)))")

    var config = {
      method: 'post',
      url: 'http://localhost:9005/api/surveyparticipants/bulkCreateSurveyParticipant',
      headers: {
        'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
        'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then((response)=> {
        alert(response.data.resultMessage)
        this.$router.push({ name: 'tutorials',query: { id:this.userId } });

      })
      .catch(function(error) {
        console.log(error);
      });

  },

  removeParents(e,i,oid) {
  this.QuestionDetails[i].surveyquestion_answer.splice(oid, 1);
    //e.currentTarget.parentNode.remove();
    //this.QuestionDetails[i].surveyquestion_answer.splice(0, 1);


    },
  updateData(){
  console.log(this.surveyId,"===================>")
    let surveyDetails={
    id:this.surveyId,
    survey_name:this.tutorial.title,
    survey_description:this.tutorial.description,
    survey_introparagraph:this.tutorial.type,
    survey_startdate:this.momentFunction(this.startDate),
    survey_enddate:this.momentFunction(this.endDate)
    }
    var data = JSON.stringify({surveyDetails:surveyDetails,QuestionDetails:this.QuestionDetails});


    var config = {
      method: 'put',
      url: 'http://localhost:9005/api/surveydetails/updateSurvey',
      headers: {
        'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
        'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2',
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(response=> {
      alert(response.data.resultMessage)
    })
    .catch(function (error) {
      console.log(error);
    });


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
        this.tutorial.title = response.data.SurveyDetails[0].survey_name
        this.tutorial.description = response.data.SurveyDetails[0].survey_description
        this.tutorial.type=response.data.SurveyDetails[0].survey_introparagraph
        this.startDate=this.momFun(response.data.SurveyDetails[0].survey_startdate)
        this.endDate=this.momFun(response.data.SurveyDetails[0].survey_enddate)
        this.QuestionDetails = response.data.QuestionDetails
        this.surveyId=response.data.SurveyDetails[0].id
      })
      .catch(function(error) {
        console.log(error);
      });
  },
    addQ() {
      this.QuestionDetails.push({
        surveyquestion_answer: []
      })
    },

    removeQ(i) {
      if(this.QuestionDetails[i].id){
      console.log(1111111111111111)
      var data = JSON.stringify({
        "questionId": this.QuestionDetails[i].id
      });
      var config = {
        method: 'delete',
        url: 'http://localhost:9005/api/surveyQuestion/deleteQuestionById',
        headers: {
          'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
          'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2',
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(response=> {
          this.QuestionDetails.splice(i, 1)
        })
        .catch(function(error) {
          console.log(error);
        });
      }else{
        this.QuestionDetails.splice(i, 1)
      }



    },
    momentFunction(date) {
      return moment(date).format('DD-MM-YYYY');
    },
    momFun(date){
      return moment(date).format('MM-DD-YYYY');
    },
    saveQuestions() {
      console.log(this.textFields,">>>>>>>>>>>>>>>>>>>>>>>>>>")
      var data = {};
      let questionDetails = [];
      this.textFields.map((item,ind) => {
        let str = ""
        if (item.inputs.length > 0) {
          item.inputs.map(i => {
            str += i + ","
          })
        }
        str.slice(0, -1)
        questionDetails.push({
          surveyQuestionType: item.qtype,
          surveyQuestionText: item.value1,
          surveyQuestionOptionDetails: str
        })
      })

      data.questionDetails = questionDetails
      data.surveyId = this.surveyId
      var self=this;
      console.log(data, "++++++++++++++++pppppppppppppppppppp++++")
      var config = {
        method: 'post',
        url: 'http://localhost:9005/api/surveyQuestion/bulkCreateSurveyQuestion',
        headers: {
          'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
          'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };

      axios(config)
        .then(function(response) {
          alert(response.data.resultMessage);
          self.participantsFlag = true;
          self.queSaveButton=false;
        })
        .catch(function(error) {
          console.log(error);
        });



    },
    add(i) {
      this.QuestionDetails[i].surveyquestion_answer.push(this.QuestionDetails[i].surveyquestion_answer.length+1)
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
