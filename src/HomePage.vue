<template>
  <div class="container">
    <!-- <HeaderComponent /> -->
    
      <div class="head-condainer">
      <div class="serach-container">
        <div v-if="hideForm">
          <h2>THE LIST OF USERS</h2>
          <button class="add-btn" @click="newData">new data</button>
        </div>
        <div v-if="!hideForm">
          <h2>ADD USERS</h2>
          <div class="add-form">
            <div>
            <label for="" >Name</label>
            <InputText type="text" v-model="nameUser" />
          </div>
          <div>
            <label for="" >Department</label>
            <InputText type="text" v-model="nameDep" />
          </div>
          <div>
            <label for="" >Designation</label>
            <InputText type="text" v-model="nameDesig" />
          </div>
          <Button label="Submit"  @click="addUser" class="p-button-success" icon="pi pi-check" iconPos="right" />
          </div>
          <Button label="Back to list page" @click="hideForm = true" icon="pi-chevron-left" />
          <!-- <button @click="hideForm = true">Back to list page</button> -->
          <Button label="Clear all" class="p-button-danger" @click="nameDep = '',nameDesig='',nameUser =''" />
        </div>
        <div class="bannerHeading" v-else>
              <!-- <h1>Discover the world of events</h1> -->
                <span class="p-input-icon-left ">
                    <i class="pi pi-search" />
                    <InputText class="Searchinput" id="search-area" type="text" v-model="nameUser" placeholder="Name/Department/Designation" />
                </span>

                <div class="card-section">
                  <div class="card" v-for="(item,index) in cardName" :key="index">
                  <Card>
                   
                      <template #content>
                          <div class="cardInside" >
                            <!-- <input type="text" v-model="item.name"> -->
                            <span><p>Name: <b> {{item.name}} </b><br> Designation: <b>{{item.desig}}</b><br>Department: <b>{{item.dep}}</b></p></span>
                            <Button icon="pi pi-trash" @click="deleteData(item.id)" class="p-button-rounded p-button-danger" />
                          </div>
                      </template>
                      
                  
                </Card>
                
                </div>
                </div>
        </div>
        
      </div>
      
    </div>
    
    
    
    
  </div>
  
</template>

<script>
// import HeaderComponent from "./components/HeaderComponent.vue";
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import { addDoc, collection, onSnapshot,query,deleteDoc,doc } from 'firebase/firestore';
import db from "./db-connection/db";
import { onUnmounted } from 'vue';
import Button from 'primevue/button';


export default {
  listData: null,
  name: 'HomePage',
  components: {
    // HeaderComponent,
    InputText,
    Card,
    Button
     // Register the component locally
  },
  // props: {
  //   msg: String
  // }
  data (){
    return{
      name: null,
      searchData: null,
      addName:'',
      nameUser: '',
      nameDep:'',
      nameDesig:'',
      cardName: [],
      tempCardName: [],
      hideForm : true
    }
  },
  mounted(){
    const listData = query(collection(db,"user"));
    const cardNameData = onSnapshot(listData,(snapshot)=>{
      var cardName = snapshot.docs.map((doc)=>{
        
        if (doc.exists()) {
          let obj = {
            id: doc.id,
             name : doc.data().name,
            desig : doc.data().designation,
            dep : doc.data().department
          };
          this.cardName.push(obj);
        } else {
          console.log("No such document!");
        }
        return cardName;
      })
    });
    this.tempCardName = this.cardName;
    
    onUnmounted(cardNameData)
  },
  
  methods:{
    
    newEvent(){
      this.$router.push('/new');
    },
    listEvent(){
      this.$router.push('/list');
    },
    newData(){
      this.hideForm = false;
    },
    addUser(){
      addDoc(collection(db,'user'),{
        name:this.nameUser,
        designation:this.nameDesig,
        department:this.nameDep
      });
      
      this.hideForm = true;
    },
    deleteData(id){
      deleteDoc(doc(db,'user',id));
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  },
  watch:{
    nameUser(){
      if (this.nameUser.length>0) {
        this.cardName = this.tempCardName.filter((ele)=> ele.name.toLowerCase().trim().startsWith(this.nameUser.toLowerCase().trim()) || ele.desig.toLowerCase().trim().startsWith(this.nameUser.toLowerCase().trim()) || ele.dep.toLowerCase().trim().startsWith(this.nameUser.toLowerCase().trim()) );
      
      }
      else{
        this.cardName = this.tempCardName;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
