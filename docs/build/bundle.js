
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.37.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.37.0 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let div26;
    	let div25;
    	let div24;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div0;
    	let a0;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let a1;
    	let img2;
    	let img2_src_value;
    	let t2;
    	let a2;
    	let img3;
    	let img3_src_value;
    	let t3;
    	let div23;
    	let div22;
    	let div2;
    	let t5;
    	let div21;
    	let div6;
    	let div3;
    	let t7;
    	let div5;
    	let div4;
    	let t9;
    	let t10;
    	let div12;
    	let div7;
    	let t12;
    	let div9;
    	let div8;
    	let t14;
    	let t15;
    	let div11;
    	let div10;
    	let t17;
    	let t18;
    	let div20;
    	let div13;
    	let t20;
    	let div15;
    	let div14;
    	let t22;
    	let t23;
    	let div17;
    	let div16;
    	let t25;
    	let t26;
    	let div19;
    	let div18;
    	let t28;

    	const block = {
    		c: function create() {
    			div26 = element("div");
    			div25 = element("div");
    			div24 = element("div");
    			div1 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div0 = element("div");
    			a0 = element("a");
    			img1 = element("img");
    			t1 = space();
    			a1 = element("a");
    			img2 = element("img");
    			t2 = space();
    			a2 = element("a");
    			img3 = element("img");
    			t3 = space();
    			div23 = element("div");
    			div22 = element("div");
    			div2 = element("div");
    			div2.textContent = "Sunny Guan";
    			t5 = space();
    			div21 = element("div");
    			div6 = element("div");
    			div3 = element("div");
    			div3.textContent = "Education";
    			t7 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div4.textContent = "UT Dallas";
    			t9 = text("\n                2020 - 2022");
    			t10 = space();
    			div12 = element("div");
    			div7 = element("div");
    			div7.textContent = "Experiences";
    			t12 = space();
    			div9 = element("div");
    			div8 = element("div");
    			div8.textContent = "Virtu Financial";
    			t14 = text("\n                Fall 2021");
    			t15 = space();
    			div11 = element("div");
    			div10 = element("div");
    			div10.textContent = "Amazon";
    			t17 = text("\n                Summer 2021");
    			t18 = space();
    			div20 = element("div");
    			div13 = element("div");
    			div13.textContent = "Extracurriculars";
    			t20 = space();
    			div15 = element("div");
    			div14 = element("div");
    			div14.textContent = "Head of Tech";
    			t22 = text("\n                FinTech UTD");
    			t23 = space();
    			div17 = element("div");
    			div16 = element("div");
    			div16.textContent = "Research Lead";
    			t25 = text("\n                ACM Research");
    			t26 = space();
    			div19 = element("div");
    			div18 = element("div");
    			div18.textContent = "Developer";
    			t28 = text("\n                ACM Development");
    			if (img0.src !== (img0_src_value = "images/SunnyGuan.jpeg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "rounded-full mb-2 sm:my-auto mx-auto w-48 ");
    			attr_dev(img0, "alt", "Sunny");
    			add_location(img0, file, 10, 8, 394);
    			attr_dev(img1, "class", "");
    			attr_dev(img1, "width", "24");
    			attr_dev(img1, "height", "24");
    			if (img1.src !== (img1_src_value = "images/github.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "github icon");
    			add_location(img1, file, 21, 13, 750);
    			attr_dev(a0, "href", "https://github.com/sunnyguan");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "rel", "noopener noreferrer");
    			attr_dev(a0, "class", "w-6 h-6");
    			add_location(a0, file, 16, 10, 592);
    			attr_dev(img2, "class", "");
    			attr_dev(img2, "width", "24");
    			attr_dev(img2, "height", "24");
    			if (img2.src !== (img2_src_value = "images/pdf.svg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "pdf icon");
    			add_location(img2, file, 34, 13, 1089);
    			attr_dev(a1, "href", "SunnyGuan_Resume.pdf");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "rel", "noopener noreferrer");
    			attr_dev(a1, "class", "w-6 h-6");
    			add_location(a1, file, 29, 10, 939);
    			attr_dev(img3, "class", "");
    			attr_dev(img3, "width", "24");
    			attr_dev(img3, "height", "24");
    			if (img3.src !== (img3_src_value = "images/linkedin.svg")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "linkedin icon");
    			add_location(img3, file, 47, 13, 1440);
    			attr_dev(a2, "href", "https://www.linkedin.com/in/sunny-guan");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "rel", "noopener noreferrer");
    			attr_dev(a2, "class", "w-6 h-6");
    			add_location(a2, file, 42, 10, 1272);
    			attr_dev(div0, "class", "flex w-min mx-auto m-1 gap-2");
    			add_location(div0, file, 15, 8, 539);
    			attr_dev(div1, "class", "left mb-4 sm:mb-0 sm:h-full flex flex-col my-auto");
    			add_location(div1, file, 9, 6, 322);
    			attr_dev(div2, "class", "text-2xl font-semibold mb-1 text-center sm:text-left tracking-wide");
    			add_location(div2, file, 61, 10, 1825);
    			attr_dev(div3, "class", "font-medium text-lg");
    			add_location(div3, file, 68, 14, 2063);
    			attr_dev(div4, "class", "flex-1");
    			add_location(div4, file, 70, 16, 2183);
    			attr_dev(div5, "class", "font-light col-span-2 flex");
    			add_location(div5, file, 69, 14, 2126);
    			attr_dev(div6, "class", "leading-snug");
    			add_location(div6, file, 67, 12, 2022);
    			attr_dev(div7, "class", "font-medium text-lg");
    			add_location(div7, file, 76, 14, 2341);
    			attr_dev(div8, "class", "flex-1");
    			add_location(div8, file, 78, 16, 2463);
    			attr_dev(div9, "class", "font-light col-span-2 flex");
    			add_location(div9, file, 77, 14, 2406);
    			attr_dev(div10, "class", "flex-1");
    			add_location(div10, file, 82, 16, 2623);
    			attr_dev(div11, "class", "font-light col-span-2 flex");
    			add_location(div11, file, 81, 14, 2566);
    			attr_dev(div12, "class", "leading-snug");
    			add_location(div12, file, 75, 12, 2300);
    			attr_dev(div13, "class", "font-medium text-lg");
    			add_location(div13, file, 88, 14, 2778);
    			attr_dev(div14, "class", "flex-1");
    			add_location(div14, file, 90, 16, 2905);
    			attr_dev(div15, "class", "font-light col-span-2 flex");
    			add_location(div15, file, 89, 14, 2848);
    			attr_dev(div16, "class", "flex-1");
    			add_location(div16, file, 94, 16, 3064);
    			attr_dev(div17, "class", "font-light col-span-2 flex");
    			add_location(div17, file, 93, 14, 3007);
    			attr_dev(div18, "class", "flex-1");
    			add_location(div18, file, 98, 16, 3225);
    			attr_dev(div19, "class", "font-light col-span-2 flex");
    			add_location(div19, file, 97, 14, 3168);
    			attr_dev(div20, "class", "leading-snug");
    			add_location(div20, file, 87, 12, 2737);
    			attr_dev(div21, "class", "grid grid-cols-1");
    			add_location(div21, file, 66, 10, 1979);
    			attr_dev(div22, "class", "sm:my-auto");
    			add_location(div22, file, 60, 8, 1790);
    			attr_dev(div23, "class", "flex-1 text-left sm:pl-8 place-self-center w-72 sm:w-80 sm:h-full flex flex-col leading-relaxed");
    			add_location(div23, file, 57, 6, 1657);
    			attr_dev(div24, "class", "sm:flex sm:divide-x-2 divide-blue-400 divide-dashed gap-8");
    			add_location(div24, file, 8, 4, 244);
    			attr_dev(div25, "class", "my-auto mx-4 text-center p-6 sm:p-8 grid gap-2 bg-gradient-to-b sm:bg-gradient-to-r from-indigo-200 to-blue-300 shadow-2xl");
    			add_location(div25, file, 5, 2, 96);
    			attr_dev(div26, "class", "h-screen flex item-center justify-center");
    			add_location(div26, file, 4, 0, 39);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div26, anchor);
    			append_dev(div26, div25);
    			append_dev(div25, div24);
    			append_dev(div24, div1);
    			append_dev(div1, img0);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img1);
    			append_dev(div0, t1);
    			append_dev(div0, a1);
    			append_dev(a1, img2);
    			append_dev(div0, t2);
    			append_dev(div0, a2);
    			append_dev(a2, img3);
    			append_dev(div24, t3);
    			append_dev(div24, div23);
    			append_dev(div23, div22);
    			append_dev(div22, div2);
    			append_dev(div22, t5);
    			append_dev(div22, div21);
    			append_dev(div21, div6);
    			append_dev(div6, div3);
    			append_dev(div6, t7);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div5, t9);
    			append_dev(div21, t10);
    			append_dev(div21, div12);
    			append_dev(div12, div7);
    			append_dev(div12, t12);
    			append_dev(div12, div9);
    			append_dev(div9, div8);
    			append_dev(div9, t14);
    			append_dev(div12, t15);
    			append_dev(div12, div11);
    			append_dev(div11, div10);
    			append_dev(div11, t17);
    			append_dev(div21, t18);
    			append_dev(div21, div20);
    			append_dev(div20, div13);
    			append_dev(div20, t20);
    			append_dev(div20, div15);
    			append_dev(div15, div14);
    			append_dev(div15, t22);
    			append_dev(div20, t23);
    			append_dev(div20, div17);
    			append_dev(div17, div16);
    			append_dev(div17, t25);
    			append_dev(div20, t26);
    			append_dev(div20, div19);
    			append_dev(div19, div18);
    			append_dev(div19, t28);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div26);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let { name } = $$props;
    	const writable_props = ["name"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({ name });

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
