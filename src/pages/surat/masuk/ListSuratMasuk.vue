<template>
    <v-flex lg12>
        <v-card>
            <v-toolbar card color="white">
            <v-text-field
            flat
            solo
            prepend-icon="search"
            placeholder="Type something"
            v-model="search"
            hide-details
            class="hidden-sm-and-down"
            ></v-text-field>     
            <v-btn icon>
                <v-icon>filter_list</v-icon>
            </v-btn>         
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
            <v-data-table
                :headers="table.headers"
                :search="search"
                :items="table.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                >
                <template slot="items" slot-scope="props">            
                <td>{{ props.item.date }}</td>
                <td>{{ props.item.number }}</td>
                <td>{{ props.item.sender }}</td>
                <td>{{ props.item.subject }}</td>
                <td>{{ props.item.tendency }}</td>
                <td>
                    <v-btn 
                        depressed 
                        outline 
                        icon 
                        fab 
                        dark 
                        color="primary" 
                        small 
                        @click="showButtonClicked(props.item.id)">
                    <v-icon>visibility</v-icon>
                    </v-btn>
                    <v-btn 
                        depressed 
                        outline 
                        icon 
                        fab 
                        dark 
                        color="primary" 
                        small 
                        @click="editButtonClicked(props.item.id)">
                    <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn 
                        depressed 
                        outline 
                        icon 
                        fab 
                        dark 
                        color="warning" 
                        small @click="deleteButtonClicked(props.item.id)">
                    <v-icon>delete</v-icon>
                    </v-btn>
                </td>
                </template>
            </v-data-table>
            </v-card-text>
        </v-card>
    </v-flex> 
</template>

<script>
export default {
  data () {
    return {
      table: {
        selected: [],
        headers: [
          {
            text: 'Tanggal',
            value: 'date'
          },
          {
            text: 'No. Surat',
            value: 'number'
          },
          {
            text: 'Pengirim',
            value: 'sender'
          },
          {
            text: 'Subjek',
            value: 'subject'
          },
          {
            text: 'Perihal',
            value: 'tendency'
          },
          {
            text: 'Action',
            value: ''
          }
        ],
        items: [
          {
            id: 1,
            date: '2012-02-07',
            number: '2018/OK/PDG.2',
            sender: 'Anu',
            subject: 'Perencanaan Pembangunan Masjid di Kelurahan Apa Gituh 2018',
            tendency: 'Penting'
          },
          {
            id: 2,
            date: '2012-02-01',
            number: '2018/OK/PDG.10',
            sender: 'Ani',
            subject: 'Makan-makan',
            tendency: 'Penting'
          },
          {
            id: 3,
            date: '2012-02-20',
            number: '2018/OK/PDG.11',
            sender: 'Oker',
            subject: 'Minum-minum',
            tendency: 'Penting'
          },
          {
            id: 4,
            date: '2012-02-13',
            number: '2018/OK/PDG.3',
            sender: 'One',
            subject: 'Minum-makan',
            tendency: 'Penting'
          },
          {
            id: 5,
            date: '2012-02-05',
            number: '2018/OK/PDG.4',
            sender: 'Hana',
            subject: 'Makan-Minum',
            tendency: 'Penting'
          }
        ]
      },
      search: ''
    };
  },
  methods: {
    showButtonClicked (id) {
      return 0;
    },
    editButtonClicked (id) {
      return 0;
    },
    deleteButtonClicked (id) {
      return 0;
    }
  }
};
</script>
