 <template>
  <div class="brewMap">
    <v-autocomplete
      v-model="searchedItem"
      dark
      @change="selectItem"
      :items="brews"
      item-text="name"
      label="Search"
      item-value="obdb_id"
      class="searchInput"
    >
    </v-autocomplete>
    <mapka :selectedItem="searchedItem" />
  </div>
</template>

<script>
import Mapka from "../components/Mapka.vue";
import { mapState } from "vuex";

export default {
  name: "Map",
  data() {
    return {
      searchedItem: "",
    };
  },
  components: {
    Mapka,
  },
  methods: {
    selectItem() {
      let selectedItem = this.searchedItem;
      console.log(selectedItem);
    },
  },

  computed: {
    ...mapState("brewsStore", ["brews"]),
  },
};
</script>
<style scoped>
.brewMap {
  height: 100%;
}
.searchInput {
  max-width: 200px;
  margin: auto;
  margin-top: 3rem;
}
</style>