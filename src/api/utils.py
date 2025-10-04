from flask import jsonify, url_for


class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def generate_sitemap(app):
    links = []
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join([
        f"<li style='background-color:#cceffc; padding:10px 15px; margin-bottom:4px; border-radius:6px; list-style:none; transition:0.3s;'>"
        f"<a href='{y}' style='color:#004466; font-weight:500; text-decoration:none;' "
        f"onmouseover=\"this.style.color='#00aeef'\" onmouseout=\"this.style.color='#004466'\">{y}</a></li>"
        for y in links
    ])

    return f"""
    <div style="min-height:100vh; display:flex; justify-content:center; align-items:flex-start; background-color:#f0f8ff; padding:40px 10px;">
      <div style="max-width:700px; width:100%; text-align:center;">
        <h2 style="color:#004466; margin-bottom:30px;">🌐 API Sitemap</h2>

        <div style="display:flex; justify-content:center; margin-bottom:30px; gap:10px;">
          <input 
            type="text" 
            id="api-host" 
            readonly
            style="flex:1; padding:12px 15px; font-size:1rem; text-align:center; background-color:#cceffc; border:1px solid #33bef2; color:#004466; border-radius:6px;"
          >
          <button 
            onclick="navigator.clipboard.writeText(document.getElementById('api-host').value)"
            style="padding:12px 20px; font-size:1rem; background-color:#00aeef; color:#004466; border:1px solid #33bef2; border-radius:6px; cursor:pointer;"
          >
            Copiar
          </button>
        </div>

        <p style="color:#004466; font-weight:500; margin-bottom:20px;">Endpoints disponibles:</p>

        <ul style="padding:0; margin:0 auto; max-width:600px;">
          {links_html}
        </ul>
      </div>
    </div>

    <script>
      document.getElementById("api-host").value = window.location.origin;
    </script>
    """


