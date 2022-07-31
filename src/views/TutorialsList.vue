<template>
<v-card-text>
  <h1>Surveys List</h1>
  <h4>Search, Edit or Delete Surveys</h4><br>
  <v-btn @click="deleteData" style="background: #FF0000;color:white; ">DELETE all</v-btn>
</v-card-text>
<table-lite :has-checkbox="true" :is-loading="table.isLoading" :is-re-search="table.isReSearch" :columns="table.columns" :rows="table.rows" :rowClasses="table.rowClasses" :total="table.totalRecordCount" :sortable="table.sortable"
  @do-search="doSearch" @is-finished="tableLoadingFinish" @return-checked-rows="updateCheckedRows" @row-clicked="rowClicked"></table-lite><br><br>
  <v-row v-if="table.totalRecordCount==0" justify="center">
    <v-btn @click="addTutorial" style="background: #6495ED; width:20%;">Add Survey</v-btn>
  </v-row><br>
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
const id =  useRoute().query.id
var cache = new WebStorageCache();
 cache.set('userId',id );
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
          label: "Survey Title",
          field: "survey_name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Survey Description",
          field: "survey_description",
          width: "15%",
          sortable: true,
        },
        {
          label: "View",
          field: "view",
          width: "10%",
          display: function(row) {
          return (
          '<a href="http://ec2-54-67-126-182.us-west-1.compute.amazonaws.com/view?surveyId=' +
          row.id +
          '" data-id="' +
          row.id +
          '" class="name-btn">http://ec2-54-67-126-182.us-west-1.compute.amazonaws.com/view?surveyId=' +
          row.id +
          "</button>"
        );
          },
        },
        {
          label: "Edit",
          field: "edit",
          width: "10%",
          display: function(row) {
            return (
              '<button type="button" style="background: #6495ED; width:100%;" data-id="' +
              row.id +
              '" class="is-rows-el edit-btn">Edit</button>'
            );
          },
        },
        {
          label: "Delete",
          field: "delete",
          width: "10%",
          display: function(row) {
            return (
              '<button type="button" style="background: #E95462; width:100%;" data-id="' +
              row.id +
              '" class="is-rows-el delete-btn">Delete</button>'
            );
          },
        },
        {
          label: "Response",
          field: "response",
          width: "10%",
          display: function(row) {
            return (
              '<button type="button" style="background: #00FF00; width:100%;" data-id="' +
              row.id +
              '" class="is-rows-el response-btn">Result</button>'
            );
          },
        },
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
          url: baseurl+'surveydetails/surveyList?userId='+id+"&offset="+offset+"&limit="+limit,
          headers: {
            'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
            'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2'
          }
        };
        axios(config)
          .then(function(response) {
            table.rows = response.data.responseData
            table.totalRecordCount = response.data.totalCount;
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
    return {
      table,
      doSearch,
      tableLoadingFinish,
      updateCheckedRows,
      rowClicked,
      deleteData
    };
  },
  methods:{
    addTutorial(){
      this.$router.push({ name: 'add' });
    }
  }
});
</script>
