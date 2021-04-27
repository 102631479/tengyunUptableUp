<template>
  <div class="amap-page-container">
    <div>
    {{value}}
    </div>
    <el-amap-search-box
      :searchOption="{ citylimit: false}"
      class="search-box"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <el-amap
      vid="amapDemo"
      :zoom="12"
      class="amap-demo"
      :center="center"
      @click="mapClick"
      :events="events"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :position="marker.position"
        :events="marker.event"
        :content="marker.content"
        :vid="index"
        :key="marker.center"
      ></el-amap-marker>
    </el-amap>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      value: "0,0"
    }
  },
  data() {
    return {
      position: "0,0",
      center: [116.4, 39.9],
      events: {
        click: this.mapClick
      },
      markers: []
    };
  },
  created() {
    this.position = this.value;
  },

  methods: {
    mapClick({ lnglat }) {
      let arr = [lnglat.lng, lnglat.lat];
      this.$emit("input", `${lnglat.lng},${lnglat.lat}`);
      this.markers = [
        {
          position: arr,
          event: {
            click: () => {
              this.position = `${lnglat.lng},${lnglat.lat}`
              this.$emit("input", `${lnglat.lng},${lnglat.lat}`);
            }
          }
        }
      ];
      this.center = arr;
    },
    // 搜索函数
    onSearchResult(pois) {
      this.center = [pois[0].location.lng, pois[0].location.lat];
      this.markers = pois.map(item => {
        // console.log(item);
        return {
          position: [item.location.lng, item.location.lat],
          title: item.name,
          event: {
            click: () => {
              this.markers = [
                {
                  position: [item.location.lng, item.location.lat],
                  event: {
                    click: () => {
                      this.position = `${lnglat.lng},${lnglat.lat}`
                      this.$emit("input", `${lnglat.lng},${lnglat.lat}`);
                    }
                  }
                }
              ];
              this.$emit("input", `${item.location.lng},${item.location.lat}`);
            }
          }
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-page-container {
  position: relative;
  .amap-demo {
    height: 400px;
    width: 360px;
  }
}
</style>