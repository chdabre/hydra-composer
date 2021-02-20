import Rete from 'rete';
import VueRenderPlugin from 'rete-vue-render-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import AreaPlugin from 'rete-area-plugin';
import MinimapPlugin from 'rete-minimap-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';

import OscComponent from '@/composer/components/sources/OscComponent';
import RotateComponent from '@/composer/components/geometry/RotateComponent';
import BlendComponent from '@/composer/components/operators/BlendComponent';
import VariableComponent from '@/composer/components/math/VariableComponent';
import NumberComponent from '@/composer/components/math/NumberComponent';
import OutputComponent from '@/composer/components/OutputComponent';
import GradientComponent from '@/composer/components/sources/GradientComponent';
import NoiseComponent from '@/composer/components/sources/NoiseComponent';
import ShapeComponent from '@/composer/components/sources/ShapeComponent';
import VoronoiComponent from '@/composer/components/sources/VoronoiComponent';
import BrightnessComponent from '@/composer/components/color/BrightnessComponent';
import ContrastComponent from '@/composer/components/color/ContrastComponent';
import ColoramaComponent from '@/composer/components/color/ColoramaComponent';
import InvertComponent from '@/composer/components/color/InvertComponent';
import SaturateComponent from '@/composer/components/color/SaturateComponent';
import ColorComponent from '@/composer/components/color/ColorComponent';
import LumaComponent from '@/composer/components/color/LumaComponent';
import PosterizeComponent from '@/composer/components/color/PosterizeComponent';
import ShiftComponent from '@/composer/components/color/ShiftComponent';
import ThresholdComponent from '@/composer/components/color/ThresholdComponent';
import KaleidComponent from '@/composer/components/geometry/KaleidComponent';
import PixelateComponent from '@/composer/components/geometry/PixelateComponent';
import ScaleComponent from '@/composer/components/geometry/ScaleComponent';
import ScrollXComponent from '@/composer/components/geometry/ScrollXComponent';
import ScrollYComponent from '@/composer/components/geometry/ScrollYComponent';
import RepeatComponent from '@/composer/components/geometry/RepeatComponent';
import ModulateComponent from '@/composer/components/modulators/ModulateComponent';

export default class Composer {
  constructor(editor, engine, modelBuilder) {
    this.editor = editor;
    this.engine = engine;
    this.modelBuilder = modelBuilder;
  }

  static async create(container, modelBuilder) {
    const components = [
      new OscComponent(),
      new BrightnessComponent(),
      new ColoramaComponent(),
      new ContrastComponent(),
      new InvertComponent(),
      new SaturateComponent(),
      new ColorComponent(),
      new LumaComponent(),
      new PosterizeComponent(),
      new ShiftComponent(),
      new ThresholdComponent(),
      new KaleidComponent(),
      new PixelateComponent(),
      new RepeatComponent(),
      new RotateComponent(),
      new ScaleComponent(),
      new ScrollXComponent(),
      new ScrollYComponent(),
      new BlendComponent(),
      new ModulateComponent(),
      new VariableComponent(),
      new NumberComponent(),
      new GradientComponent(),
      new NoiseComponent(),
      new ShapeComponent(),
      new VoronoiComponent(),
      new OutputComponent(modelBuilder),
    ];

    const editor = new Rete.NodeEditor('demo@0.1.0', container);

    editor.use(VueRenderPlugin);
    editor.use(ConnectionPlugin);
    editor.use(AreaPlugin, {
      scaleExtent: { min: 0.1, max: 1 },
    });
    editor.use(MinimapPlugin);
    editor.use(ContextMenuPlugin, {
      delay: 500,
      allocate: (c) => (c.path ? c.path.split('/') : []),
    });

    const engine = new Rete.Engine('demo@0.1.0');

    components.forEach((component) => {
      editor.register(component);
      engine.register(component);
    });

    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
    });

    return new Composer(editor, engine, modelBuilder);
  }

  onUpdate(callback) {
    this.editor.on('process nodecreated noderemoved connectioncreated connectionremoved', callback);
  }

  async load(data) {
    await this.editor.fromJSON(data);
    await this.engine.abort();
    await this.engine.process(this.editor.toJSON());

    AreaPlugin.zoomAt(this.editor);
  }

  async getJSON() {
    return this.editor.toJSON();
  }
}
