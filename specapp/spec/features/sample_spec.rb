require 'spec_helper'

RSpec.describe 'Sample' do
  describe 'forms' do
    before do
      visit('/sample')
    end

    it 'sample specs' do
      find('div', text: /\Aradio button with label\z/).click
      find('div', text: /\Acheckbox with label\z/).click
      find('div', text: /\Aselectbox by form helper\z/).click
      find(:xpath, 'id("new_sample")/div[8]').click
      find(:xpath, 'id("new_sample")/div[8]').click
      click_button 'sample button'
      find(:xpath, 'id("new_sample")/div[12]').click
      find('label', text: /\ADrink\z/).click
      find_by_id('sample_drink').click
      find('label', text: /\APeach\z/).click
      find_by_id('sample_food_p').click
      choose 'Peach'
      find('div', text: /\Aradio button with label\z/).click
    end
  end
end
