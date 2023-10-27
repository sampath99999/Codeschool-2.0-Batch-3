inventoryManagementApp.service('randomColorGenerationService',function(){
    this.generateDistinctColors = function(count) {
        var colors = [];
        for (var i = 0; i < count; i++) {
            var hue = (i * 137) % 360;
            var color = 'hsl(' + hue + ', 70%, 60%)';
            colors.push(color);
        }
        return colors;
    };
})