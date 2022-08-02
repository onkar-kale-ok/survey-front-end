<template >
<v-card-text v-if="table.rows">
  <h1 style="text-align:center; color:#033E3E"><u>USER LIST</u></h1><br>

<table-lite  :is-loading="table.isLoading" :is-re-search="table.isReSearch" :columns="table.columns" :rows="table.rows" :rowClasses="table.rowClasses" :total="table.totalRecordCount" :sortable="table.sortable"
  @do-search="doSearch" @is-finished="tableLoadingFinish" @return-checked-rows="updateCheckedRows" @row-clicked="rowClicked"></table-lite><br><br>
  <v-row v-if="table.totalRecordCount==0" justify="center">
    <v-btn @click="addTutorial" style="background: #6495ED; width:20%;">Add Survey</v-btn>
  </v-row><br>
  </v-card-text>
  <v-card-text v-if="!table.rows">
  <h1 style="text-align:center">YOU CAN'T ACCESS THIS PAGE</h1><br>
  <v-card-text>
  <v-row justify="center">
    <v-btn @click="cancel">Back</v-btn>
  </v-row>
  </v-card-text>
  </v-card-text>
</template>

<script>

import {
  defineComponent,
  reactive
} from "vue";
import TableLite from "vue3-table-lite";
import axios from "axios";
import {useRoute} from "vue-router";
import Router from '../router'
import WebStorageCache from 'web-storage-cache'
import { baseurl } from "../http-common"

export default defineComponent({
  name: "App",
  components: {
    TableLite
  },
  setup() {
var cache = new WebStorageCache();
const userId=cache.get('userId')
    // Table config
    const table = reactive({
      isLoading: false,
      isReSearch: false,
      rowClasses: (row) => {
        if (row.id == 1) {
          return ["aaa", "is-id-one"];
        }
        return ["bbb", "other"];
      },
      columns: [{
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Email",
          field: "user_Email",
          width: "10%",
          sortable: true,
        },
        {
          label: "First Name",
          field: "user_Firstname",
          width: "15%",
          sortable: true,
        },
        {
          label: "Last Name",
          field: "user_Lastname",
          width: "15%",
          sortable: true,
        },
        {
          label: "Role",
          field: "user_role",
          width: "15%",
          sortable: true,
        }
      ],
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
      messages: {
        pagingInfo: "Showing {0}-{1} of {2}",
        pageSizeChangeLabel: "Row count:",
        gotoPageLabel: "Go to page:",
        noDataAvailable: "No data",
      },
    });
    /**
     * Search Event
     */
     let Ids=[]
    const doSearch = async (offset, limit, order, sort) => {
      table.isLoading = true;

      table.isReSearch = offset == undefined ? true : false;

      if (sort == "asc") {
        var config = {
          method: 'get',
          url: baseurl+'survey/getUserList?userId='+userId+"&offset="+offset+"&limit="+limit,
          headers: {
            'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
            'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2'
          }
        };
        axios(config)
          .then(function(response) {
            table.rows = response.data.responseData
            table.totalRecordCount = response.data.totalCount?response.data.totalCount:0;
            table.sortable.order = order;
            table.sortable.sort = sort;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    };
    /**
     * Loading finish event
     */
    const tableLoadingFinish = (elements) => {
      table.isLoading = false;
      Array.prototype.forEach.call(elements, function(element) {
        if (element.classList.contains("view-btn")) {
          element.addEventListener("click", function(event) {
            event.stopPropagation(); // prevents further propagation of the current event in the capturing and bubbling phases.
            console.log(this.dataset.id + " view-btn click!!");
            Router.push('/view?surveyId='+this.dataset.id)
          });
        }
        if (element.classList.contains("edit-btn")) {
          element.addEventListener("click", function(event) {
            event.stopPropagation(); // prevents further propagation of the current event in the capturing and bubbling phases.
            console.log(this.dataset.id + " edit-btn click!!");
            Router.push('/edit?surveyId='+this.dataset.id)
          });
        }
        if (element.classList.contains("delete-btn")) {
          element.addEventListener("click", function(event) {
            event.stopPropagation(); // prevents further propagation of the current event in the capturing and bubbling phases.
            console.log(this.dataset.id + " delete-btn click!!");
            var data = JSON.stringify({
              "surveyId": [this.dataset.id]
            });

            var config = {
              method: 'delete',
              url: baseurl+'surveydetails/deleteSurveyById',
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
                doSearch(0, 10, "id", "asc");
              })
              .catch(function(error) {
                console.log(error);
              });
          });
        }
        if (element.classList.contains("response-btn")) {
          element.addEventListener("click", function(event) {
            event.stopPropagation(); // prevents further propagation of the current event in the capturing and bubbling phases.
            console.log(this.dataset.id + " edit-btn click!!");
            Router.push('/response?surveyId='+this.dataset.id)
          });
        }
      });
    };
    /**
     * Row checked event
     */
    const updateCheckedRows = (rowsKey) => {
    Ids=rowsKey
      console.log(rowsKey, "rowsKeyrowsKey");
    };
    // First get data
    doSearch(0, 10, "id", "asc");
    /**
     * Row clicked event
     */
    const rowClicked = (row) => {
      console.log("Row clicked!", row);
    };

    const deleteData = () => {
      var data = JSON.stringify({
        "surveyId": Ids
      });

      var config = {
        method: 'delete',
        url: baseurl+'surveydetails/deleteSurveyById',
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
          doSearch(0, 10, "id", "asc");
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    const cancel = () => {
    Router.push('/surveys?id='+ userId)
    }

    return {
      table,
      doSearch,
      tableLoadingFinish,
      updateCheckedRows,
      rowClicked,
      deleteData,
      cancel
    };
  },
  methods:{
    addTutorial(){
      this.$router.push({ name: 'add' });
    }
  }
});
</script>
