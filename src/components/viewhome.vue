<template>
    <div class="container mt-5">
        <router-link class="btn-sm btn btn-primary" to="/add"><i class="fa fa-plus-square-o"></i> ADD NEW STAFFS</router-link>
        <button class="btn-sm btn btn-success" @click="resetJsonArray"><i class="fa fa-refresh"></i> Reset Json Array</button>
        
<!-- Alert Box for delete success --> 
        <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert" v-show="this.successDelMsg">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
          </button>
          <strong>{{successDelMsg}}</strong> Deleted Successfully.
        </div>
   
 
 <!-- Table Section -->
          <div class="table-responsive-sm mt-4">
              <table class="table">
                <thead class="bg-dark text-light">
<!--                   <th scope="col">Data ID</th>
 -->                  
                  <th scope="col">Staff ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">NIC</th>
                  <th scope="col">Action</th>
                </thead>
                
                <tr v-for="(items,index) in addedArray" :key="items.DataID">
<!--                   <td> {{index}}</td>  
                  <td>{{items.DataID}}</td>
 -->                  
                  <td>{{items.staffID}}</td>
                  <td>{{items.staffname}}</td>
                  <td>{{items.address}}</td>
                  <td>{{items.nic}}</td>
                  <td>
                    <button @click="editForm(items,index)" class="btn btn-primary btn-sm"  data-toggle="modal" data-target="#editModal"><i class="fa fa-edit"></i> Edit </button> 
                    <!-- <button @click="removeForm(index)" class="btn btn-danger btn-sm" to="/"><i class="fa fa-trash"></i> Delete</button> -->
                    <button @click="removeForm(index)" class="btn btn-danger btn-sm" to="/" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash"></i> Delete</button>
                  </td>
                </tr>
              </table>
            </div>
                        

<!-- Edi Modal Section-->
          <form action="" method="post" @submit.prevent="UpdateForm">
            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <!-- Model Header -->
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Update Staff Information</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    
                    <!-- Model Body -->
                    <div class="modal-body">
                      <p class="bg-success text-light rounded mb-5 p-3" v-if="this.successMsg"> {{successMsg}} </p>
                

                            <!-- Display Validation Error -->
                            <p v-if="errors.length">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                  <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p>      


                              <div class="form-group">
                                <label for="">Staff Name</label>
                                <input type="text" class="form-control" name="staffname" id="staffname" v-model="staffname" aria-describedby="helpId" placeholder=""> 
                              </div>
                              
                              <div class="form-group">
                                <label for="">Address</label>
                                <input type="text" class="form-control" name="address" id="address" v-model="address" aria-describedby="helpId" placeholder=""> 
                              </div>
                              
                              <div class="form-group">
                                <label for="">NIC</label>
                                <input type="text" class="form-control" name="nic" id="nic" v-model="nic" :maxlength="maxNICLength" :minlength="this.minNICLength" aria-describedby="helpId" placeholder=""> 
                              </div>

                              <input type="hidden" disabled name="DataID" id="DataID" v-model="DataID">
                  
                              <input type="hidden" name="staffID" id="staffID" v-model="staffID">


                            
                    </div>

                    <!-- Model Footer -->
                    <div class="modal-footer">
                      
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button   class="btn btn-primary"  >update </button> 
                    </div>

                </div>
              </div>
            </div>   
         </form>

<!-- Delete Modal Section--> 
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <!-- Model Header -->
                    <div class="modal-header">
                      <h5 class="modal-title text-danger" id="exampleModalLabel">Delete Confirmation</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    
                    <!-- Model Body -->
                    <div class="modal-body">
                    
                      <div class="row">
                        <div class="col-xl-12 ">
                          
                        </div>
                        <div class="col-xl-6 "> Do you want to delete it?  </div>
                        <div class="col-xl-6 " >  
                          
                          <button type="button" class="btn btn-secondary ml-3" data-dismiss="modal">Cancel</button>
                          <button   class="btn btn-danger ml-3" @click="removeModel()" data-dismiss="modal" >Delete </button> 
                         
                        </div>

                      </div>

                    </div>

                    <!-- Model Footer -->
                    <div class="modal-footer">
                      
                    </div>

                </div>
              </div>
            </div>   
   
     </div>
     


</template>
 
<script>  

export default { 

 
    

    data(){
        return{
            errors: [], 
            updateArray:[],
            addedArray:[
                        {
                          DataID: 0, staffID: "SL1001", staffname: "Name 1", address: "No 10, Kandy", nic: "890909090V",
                        }
                       ],

            staffID:null,
            DataID:null,
            staffname:null,
            address:null,
            nic:null, 
            successMsg:null,
            successDelMsg:null,
            maxNICLength:9,
            minNICLength:9,
            arrayIndexID:null,
            delID:null,
        }
    },
   
   // Display Data From JSon Array
   created(){
        const STORAGE_KEY = 'STAFF-MANAGMENT';
        this.addedArray = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
   },

    methods:{
        
    //reset JSon Array Deleting All Data and insert following Data
        resetJsonArray:function() {
               const STORAGE_KEY = 'STAFF-MANAGMENT';
               this.addedArray.splice(0);
               
               this.addedArray.push( 
                    {"DataID":0,"staffID":"SL1000","staffname":"Name 1","address":"No 10, Kandy","nic":"890909090V"},
                    {"DataID":1,"staffID":"SL1001","staffname":"Name 2","address":"No 12, Gampola","nic":"457675757V"},
                    {"DataID":2,"staffID":"SL1002","staffname":"Name 3","address":"No 20, Aragoda","nic":"578585858V"},
                    {"DataID":3,"staffID":"SL1003","staffname":"Name 4","address":"No 25, Deltota","nic":"908676767V"},
                    {"DataID":4,"staffID":"SL1004","staffname":"Name 5","address":"No 39, Nawalapitiya","nic":"788965434V"}
                 );
               localStorage.setItem(STORAGE_KEY, JSON.stringify(this.addedArray)); 
         },
       
    // Validation for Staff Name
        validStaffNameLetters: function (staffname) { 
          var re = /^[a-zA-Z\s]*$/;
          return re.test(staffname);
        },

    // Validation for Address
        validAddressCharacters:function (address){
            var re = /^[A-Za-z0-9,]*$/; 
            return re.test(address);
        },

    // Validation for NIC
        validNIC:function(nic){
              var re = /^[0-9]*$/;
              return re.test(nic);
        },

    // Deleting form Model
        removeModel:function(){
           
            var delIndexID = this.delID
            
            var res = this.addedArray[delIndexID].staffname;
              
            

             const STORAGE_KEY = 'STAFF-MANAGMENT';
             this.addedArray.splice(delIndexID,1);
             localStorage.setItem(STORAGE_KEY, JSON.stringify(this.addedArray));
             this.successDelMsg=res;
          


            
        },

    // Deleting a data from Json Array
        removeForm:function(index){  

             /* var res = this.addedArray[index].staffname;
              
            

             const STORAGE_KEY = 'STAFF-MANAGMENT';
             this.addedArray.splice(index,1);
             localStorage.setItem(STORAGE_KEY, JSON.stringify(this.addedArray));
             this.successDelMsg=res;   */

         this.delID = index;
         

            /*  alert('Delete');  */  
        },

    // Fetching Data to Form
        editForm:function(items,index){ 
             
          /*   alert('edited');  */
            var re = /^[0-9]*$/;
            
            this.staffname = items.staffname;
            this.staffID = items.staffID;
            this.address = items.address;
            this.DataID = items.DataID;
            this.arrayIndexID = index;

            var intNiC = items.nic;
            var str = intNiC;
            var res = str.replace(/\D/g, "");
            
            this.nic = res; 
           
        },

    // Update Exsisting data on Json Array        
        UpdateForm:function(){

            /* alert('update'); */
            
            this.errors = [];   

 
            
            if (!this.staffname) {  this.errors.push('Staff Name is Mandatory');  }

            if (!this.validStaffNameLetters(this.staffname)) { this.errors.push('Staff Name : Can contain only alphabetical letters');}
            
            if (!this.address) { this.errors.push('Address Field is Mandatory '); }

            if (!this.validAddressCharacters(this.address)) { this.errors.push('Address : Can contain only alphabetical letters, numeric characters,white space and Comma'); }

            if (!this.nic  ) { this.errors.push('NIC Field is Mandatory  '); }

            if (!this.validNIC(this.nic)) { this.errors.push('NIC Field only need numeric characters we will automatically add "V"'); }
            
            else if(this.staffname && this.validStaffNameLetters(this.staffname) && this.address && this.validAddressCharacters(this.address) && this.nic && this.validNIC(this.nic)){
             
                if (this.nic && this.staffname && this.address ) {

                      var str = this.DataID;
                      var AID = this.arrayIndexID;
                      /* alert(str); */

                      if(str == this.DataID){
                          console.log(this.arrayIndexID);
                      }
                      else{
                        console.log('null false');
                      }

                      

                      //if (this.addedArray[str].DataID == str) {
                      //if (this.arrayIndexID == this.arrayIndexID) {

                        const STORAGE_KEY = 'STAFF-MANAGMENT';

                        var DD=  this.addedArray[AID].staffname = this.staffname;
                        var EE=  this.addedArray[AID].address = this.address;
                        var FF=  this.addedArray[AID].nic = this.nic+'V';

                        this.updateArray.push( {DataID:this.addedArray.length,staffname:this.DD,address:this.EE,nic:this.FF+'V'});    
                        
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.addedArray));

                        this.staffname='';
                        this.address='';
                        this.nic='';
                        this.staffID='';
                        
                        /* alert('Done'); */
                        this.successMsg="Staff information has been updated successfully ";
                      
                  }
             else
             {
                 alert('Data Not Selected');
             }
            /* alert('Updated'); */
          }
        }
    }
}
</script>