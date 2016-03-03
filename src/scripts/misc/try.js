
jQuery(function($) {
  'use strict'

  const steps = $('.step')
    .map((i, el) => {
      const $el = $(el)

      return {
        title: $el.find('h2').text(),
        text: $el.find('p').text(),
        source: $el.find('.stylus').val().trim()
      }
    })
    .get()
  console.dir(steps)

  const step_count = steps.length,
        $styl = $('#try .stylus'),
        $css = $('#try .css')

  const page_index = (index, delta) => ((index || 0) + (delta || 0) + step_count) % step_count

  const stylusEditor = CodeMirror.fromTextArea($styl[0], {
      onKeyEvent: function(_, e) {
        if (!e || e.type !== 'keyup' || (e.keyCode >= 37 && e.keyCode <= 40)) {
          return
        }
        render()
      }
    });

  const cssEditor = CodeMirror.fromTextArea($css[0])




  let current_page = -1

  function set_page(index) {
    index = page_index(index)

    console.info(`set_page(${index}) - current=${current_page}`)

    if (current_page === index) {
      return
    }

    current_page = index

    $('#prev')
      .toggle(index)
      .attr('data-page', page_index(index, -1))

    $('#next')
      .toggle(index < step_count - 1)
      .attr('data-page', page_index(index, +1))

    let p = steps[index]
    console.log(p)

    $('#try h2').text(p.title)
    $('#try p:first').text(p.text)

    stylusEditor.setValue(p.source)
    render()
  }


  function render() {
    const source = stylusEditor.getValue().trim()

    stylus(source)
      .render((err, css) => {
        if (err) {
          console.warn(err);
          $styl.addClass('stylus-error')
          return
        }

        $styl.removeClass('stylus-error')
        cssEditor.setValue(css.trim())
      })
  }


  $('#prev, #next').click(function(ev) {
    const p = $(this).attr('data-page')
    if (p) {
      set_page(p)
      return true
    }
  })


  set_page(0)
})

