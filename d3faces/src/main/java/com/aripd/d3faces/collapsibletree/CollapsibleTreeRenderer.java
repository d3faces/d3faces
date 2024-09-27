/*
 * The MIT License
 *
 * Copyright © 2024 aripd.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package com.aripd.d3faces.collapsibletree;

import java.io.IOException;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.context.ResponseWriter;
import jakarta.faces.render.FacesRenderer;
import org.primefaces.renderkit.CoreRenderer;
import org.primefaces.util.WidgetBuilder;

@FacesRenderer(componentFamily = CollapsibleTree.COMPONENT_FAMILY, rendererType = CollapsibleTree.DEFAULT_RENDERER)
public class CollapsibleTreeRenderer extends CoreRenderer {

    @Override
    public void encodeEnd(FacesContext context, UIComponent component) throws IOException {
        if (context == null) {
            throw new NullPointerException("No context defined!");
        }

        CollapsibleTree collapsibletree = (CollapsibleTree) component;

        encodeMarkup(context, collapsibletree);
        encodeScript(context, collapsibletree);
    }

    protected void encodeMarkup(FacesContext context, CollapsibleTree collapsibletree) throws IOException {
        final ResponseWriter writer = context.getResponseWriter();

        writer.startElement("div", collapsibletree);
        writer.writeAttribute("id", collapsibletree.getClientId(), null);
        writer.endElement("div");
    }

    protected void encodeScript(FacesContext context, CollapsibleTree collapsibletree) throws IOException {
        WidgetBuilder wb = getWidgetBuilder(context);
        wb.init(CollapsibleTree.class.getSimpleName(), collapsibletree);
        wb.attr("url", collapsibletree.getUrl());

        if (collapsibletree.getWidth() != null) {
            wb.attr("width", collapsibletree.getWidth());
        }

        if (collapsibletree.getHeight() != null) {
            wb.attr("height", collapsibletree.getHeight());
        }

        wb.finish();
    }

}
