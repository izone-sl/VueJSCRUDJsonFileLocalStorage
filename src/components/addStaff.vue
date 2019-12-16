<template>
    <div class="container mt-5">
        <div class="row m-0">
            <div class="col-xl-3"></div>
            <div class="col-xl-6 mt-5">  

                <p class="bg-success text-light rounded mb-5 p-3" v-if="this.successMsg"> {{successMsg}} </p>
                <!-- Reg Form -->
                <form action="" method="post" @submit.prevent="SubmitForm">

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
                        <input type="text" class="form-control" name="nic" id="nic" v-model="nic" :maxlength="maxNICLength" :minlength="minNICLength" aria-describedby="helpId" placeholder=""> 
                    </div>
                    
                    <input type="hidden" name="DataID" id="DataID" v-model="DataID">
                    <input type="submit" class="btn btn-primary btn-sm"    value="Register" >

                 </form>
                 
            </div>
            <div class="col-xl-3"></div>
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
            maxNICLength:9,
            minNICLength:9,  
        } 
    },

   // Display Data From JSon Array
   created(){
        const STORAGE_KEY = 'STAFF-MANAGMENT';
        this.addedArray = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
   },

    methods:{
        
        
    // Submiting a Form    
        SubmitForm: function (e) {
            
            this.errors = [];
            
            if (!this.staffname) {  this.errors.push('Staff Name is Mandatory');  }

            if (!this.validStaffNameLetters(this.staffname)) {  this.errors.push('Staff Name : Can contain only alphabetical letters'); }
            
            if (!this.address) { this.errors.push('Address Field is Mandatory ');  }

            if (!this.validAddressCharacters(this.address)) { this.errors.push('Address : Can contain only alphabetical letters, numeric characters,white space and Comma'); }

            if (!this.nic  ) { this.errors.push('NIC Field is Mandatory  '); }

            if (!this.validNIC(this.nic)) { this.errors.push('NIC Field only need numeric characters we will automatically add "V"');  }
            
            else if(this.staffname && this.validStaffNameLetters(this.staffname) && this.address && this.validAddressCharacters(this.address) && this.nic && this.validNIC(this.nic)){
                
                /* alert("Allowed to post |" + this.nic+'V'); */
                
                const STORAGE_KEY = 'STAFF-MANAGMENT';
         
                if (!this.addedArray [0]) {

                    this.addedArray.push( {DataID:this.addedArray.length,staffID:'SL1000',staffname:this.staffname,address:this.address,nic:this.nic+'V'});
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.addedArray));   
                    
                    this.staffname='';
                    this.address='';
                    this.nic='';

                }
                else
                {
                    var re    = /^[0-9]*$/; 
                    var LSID  = this.addedArray[this.addedArray.length - 1].staffID;
                    var ini = LSID;
                    var res = ini.replace(/\D/g, ""); 
                    var incre =1;
                    var AID = parseInt(res) + parseInt(incre);
                    
                    /* alert(AID); */
                    
                    this.addedArray.push( {DataID:this.addedArray.length,staffID:'SL'+AID,staffname:this.staffname,address:this.address,nic:this.nic+'V'});
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.addedArray));
                    
                    this.staffname='';
                    this.address='';
                    this.nic='';
                    this.successMsg=" New staff has been registered successfully ";
                } 
            }
            
            e.preventDefault();
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
    }
}
</script>