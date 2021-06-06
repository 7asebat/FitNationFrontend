<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20,
      },
    };
  },
  props: ["labels", "data"],
  computed: {
    chartData() {
      const colors = this.data.map(
        () =>
          "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      );
      return {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: this.labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: colors,
            data: this.data,
          },
        ],
      };
    },
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.chartOptions);

    // const canvas = document.getElementById("pie-chart");
    // canvas.height = 500;
    // canvas.width = 500;
  },
};
</script>
