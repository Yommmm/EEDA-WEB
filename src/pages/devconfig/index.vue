<template>
  <div id="devconfig" class="devconfig">
    <div class="operate">
      <Button type="primary" @click="modalAdd = true">新增设备信息</Button>
      <Button type="primary" @click="modalUpdateAll = true">修改全局命令</Button>
    </div>
    <div class="content">
      <Table :columns="columns" :data="tableData"></Table>
    </div>
    <Modal
        v-model="modalUpdate"
        title="修改当前设备控制命令？"
        @on-ok="updateCmd"
        @on-cancel="modalUpdate = false">
        <p>{{rowData.eName}}({{rowData.eMac}}) 所属区域：{{rowData.eProvince}}-{{rowData.eCity}}-{{rowData.eDistrict}}</p>
        <br/>
        <label>新控制命令</label>
        <Input v-model="rowData.eCmd" placeholder="请输入新控制命令" style="width: 300px" />
    </Modal>
    <Modal
        v-model="modalUpdateAll"
        title="修改所有设备控制命令？"
        @on-ok="updateCmdAll"
        @on-cancel="modalUpdateAll = false">
        <label>新控制命令</label>
        <Input v-model="newRow.eCmd" placeholder="请输入新控制命令" style="width: 300px" />
    </Modal>
    <Modal
        v-model="modalDelete"
        title="删除当前设备信息？"
        @on-ok="deleteDev"
        @on-cancel="modalDelete = false">
        <p>{{rowData.eName}}({{rowData.eMac}}) 所属区域：{{rowData.eProvince}}-{{rowData.eCity}}-{{rowData.eDistrict}}</p>
    </Modal>
    <Modal
        v-model="modalAdd"
        title="新增设备信息"
        @on-ok="addDevInfo"
        @on-cancel="modalAdd = false">
        <label>设备名称</label>
        <Input v-model="newRow.eName" placeholder="请输入设备名称" style="width: 300px" />
        <br/><br/>
        <label>物理地址</label>
        <Input v-model="newRow.eMac" placeholder="请输入设备MAC地址" style="width: 300px" />
        <br/><br/>
        <label>控制命令</label>
        <Input v-model="newRow.eCmd" placeholder="请输入控制命令" style="width: 300px" />
        <br/><br/>
        <label>所属省市</label>
        <Input v-model="newRow.eProvince" placeholder="请输入控制命令" style="width: 300px" />
        <br/><br/>
        <label>所属地市</label>
        <Input v-model="newRow.eCity" placeholder="请输入控制命令" style="width: 300px" />
        <br/><br/>
        <label>所属区县</label>
        <Input v-model="newRow.eDistrict" placeholder="请输入控制命令" style="width: 300px" />
    </Modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "devconfig",

  components: {},

  data: function() {
    return {
      modalAdd: false,
      modalUpdateAll: false,
      modalUpdate: false,
      modalDelete: false,
      columns: [
        {
          title: "设备名称",
          key: "eId"
        },
        {
          title: "设备MAC地址",
          key: "eMac"
        },
        {
          title: "所属省份",
          key: "eProvince"
        },
        {
          title: "所属地市",
          key: "eCity"
        },
        {
          title: "所属区县",
          key: "eDistrict"
        },
        {
          title: "当前控制命令",
          key: "eCmd"
        },
        {
          title: "操作",
          render: (h, params) => {
            return (
              <div>
                <dropdown transfer placement="bottom" on-on-click={(name) => {this.operate(name, params.row)}}>
                  <a class="fc-operable">操作</a>
                  <dropdown-menu slot="list">
                    <dropdown-item name="update">修改控制命令</dropdown-item>
                    <dropdown-item name="delete">删除</dropdown-item>
                  </dropdown-menu>
                </dropdown>
              </div>
            );
          }
        },
      ],
      tableData: [],
      rowData: {
        eId:"",
        eName:"",
        eMac:"",
        eProvince:"",
        eCity:"",
        eDistrict:"",
        eCmd:""
      },
      newRow: {
        eName:"",
        eMac:"",
        eProvince:"",
        eCity:"",
        eDistrict:"",
        eCmd:""
      },
    };
  },

  computed: {},
  watch: {},
  methods: {
    addDevInfo() {
      var that = this;
      
      var instance = axios.create({
        baseURL: "http://39.108.83.208:9879",
        timeout: 1000
      });
      instance
        .post('/eeda/v1/equipmentInfo', that.newRow)
        .then(function(res) {
          that.testAxios();
          that.modalAdd = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateCmdAll() {
      var that = this;
      var path = '/eeda/v1/cmd/command/all/' + that.newRow.eCmd;
      console.log(path);

      var instance = axios.create({
        baseURL: "http://39.108.83.208:9879",
        timeout: 1000
      });
      instance
        .post(path)
        .then(function(res) {
          that.tableData = res.data.content;
          that.testAxios();
          that.modalUpdateAll = false;
        })
        .catch(function(error) {
          console.log(error);
        }
        );
    },
    updateCmd() {
      var that = this;
      
      var params = {
        command: that.rowData.eCmd,
        eMac: that.rowData.eMac
      }

      var instance = axios.create({
        baseURL: "http://39.108.83.208:9879",
        timeout: 1000
      });
      instance
        .post('/eeda/v1/cmd/command', params)
        .then(function(res) {
          that.tableData = res.data.content;
          that.testAxios();
          that.modalUpdate = false;
          console.log("updateCmd", that.modalUpdate)
        })
        .catch(function(error) {
          console.log(error);
        }
        );

    },
    deleteDev() {
      var that = this;
      var path = '/eeda/v1/equipmentInfo/' + that.rowData.eId;

      var instance = axios.create({
        baseURL: "http://39.108.83.208:9879",
        timeout: 1000
      });
      instance
        .delete(path)
        .then(function(res) {
          that.tableData = res.data.content;
          that.testAxios();
          that.modalUpdate = false;
          console.log("updateCmd", that.modalUpdate)
        })
        .catch(function(error) {
          console.log(error);
        }
        );
      that.modalDelete = false;
    },
    operate: function(name, row) {
      var that = this;
      console.log("modalUpdate", that.modalUpdate);
      that.rowData.eId = row.eId;
      that.rowData.eName = '临时名字';
      that.rowData.eMac = row.eMac;
      that.rowData.eProvince = row.eProvince;
      that.rowData.eCity = row.eCity;
      that.rowData.eDistrict = row.eDistrict;
      that.rowData.eCmd = row.eCmd;
      if('update' === name) {
        that.modalUpdate = true;
      } 
      if('delete' === name) {
        that.modalDelete = true;
      }
    },
    testAxios() {
      var that = this;
      var params = {
        pageSize: 10,
        pageNum: 1
      };

      var instance = axios.create({
        baseURL: "http://39.108.83.208:9879",
        timeout: 1000
      });
      instance
        .post('/eeda/v1/equipmentInfo/queryWithPage', params)
        .then(function(res) {
          that.tableData = res.data.content;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  mounted() {
    this.testAxios();
  }
};
</script>

<style>
.operate {
  width: 100%;
  height: 40px;
}

.ivu-btn-primary {
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
    float: right;
    margin-left: 20px;
}
</style>
