;(function ($) {
    const ALL_VALID_EVENTS_BASE: ValidEventSpec[] = [
        { event: 'bExit', label: 'bExit' },
        { event: 'swipeRight', label: 'swipeRight' },
        { event: 'swipeLeft', label: 'swipeLeft' },
        { event: 'swipeUp', label: 'swipeUp' },
        { event: 'swipeDown', label: 'swipeDown' },
    ]

    var editableEventList
    const registerType = () =>
        RED.nodes.registerType('nspanel-screensaver', {
            category: 'NSPanel',
            paletteLabel: NSPanelLui._('label.palette', 'nspanel-screensaver'),

            inputs: 1,
            outputs: 1,

            icon: 'font-awesome/fa-television',
            color: 'rgb( 50, 120, 190)',

            defaults: {
                name: { value: '' },
                nsPanel: { value: '', type: 'nspanel-panel', required: true },
                doubleTapToExit: { value: false },
                timeout: { value: null },

                events: { value: [] },
            },

            label: function () {
                return NSPanelLui.Editor.util.getNodeLabel(this)
            },

            oneditprepare: function () {
                // @ts-ignore 6133
                var self = this

                var eventInputControl = $('#node-input-event-control')
                var nsPanelInputField = $('#node-input-nsPanel')
                var nsPanelInputField_lastVal = this.nsPanel

                //TODO: refactor since code same on any page node
                nsPanelInputField.on('change', function () {
                    if (nsPanelInputField.val() == '_ADD_') {
                        eventInputControl.hide()
                        //TODO remove all events? ... keep track of original nsPanelId
                    } else {
                        if (nsPanelInputField.val() != nsPanelInputField_lastVal) eventInputControl.empty()

                        var nsPanelId = nsPanelInputField.val() as string
                        var allValidEvents = NSPanelLui.Events.addHardwareButtonEventsIfApplicable(
                            nsPanelId,
                            ALL_VALID_EVENTS_BASE
                        )
                        editableEventList?.setAvailableEvents(allValidEvents)

                        eventInputControl.show()
                    }
                })
                nsPanelInputField.trigger('change')

                editableEventList = NSPanelLui.Editor.create.editableEventList(
                    self,
                    '#node-input-event-control',
                    ALL_VALID_EVENTS_BASE,
                    self.events
                )

                var tabs = RED.tabs.create({
                    id: 'nspanel-page-tabs',
                    onchange: function (tab) {
                        $('#nspanel-page-tabs-content').children().hide()
                        $('#' + tab.id).show()
                    },
                })
                tabs.addTab({
                    id: 'nspanel-page-tab-general',
                    iconClass: 'fa fa-cog',
                    label: NSPanelLui._('label.general', 'nspanel-panel', 'common'),
                })
                tabs.addTab({
                    id: 'nspanel-page-tab-events',
                    iconClass: 'fa fa-list',
                    label: NSPanelLui._('label.events', 'nspanel-panel', 'common'),
                })
            },
            oneditsave: function () {
                this.events = editableEventList.getEvents() || []
            },
        })

    $.getScript('resources/node-red-contrib-nspanel-lui/nspanel-lui.js').done(registerType)
})(jQuery)
