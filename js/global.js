$(document).ready(function()
	{
		// Disable various aspects of passenger details table
		$('#passenger_details input, #passenger_details select').attr('disabled', 'disabled');

		// Add class="selected" to tab + tbody
		$('#tabs a:first, #passenger_details tbody:first').addClass('selected');

		// Get the value of the tab link, and display tbody
		$('#tabs a').click(function()
			{
				// Switch class="selected" for tabs
				$('#tabs a').removeClass('selected');
				$(this).addClass('selected');

				// Asign value of the link target
				var thisTarget = $(this).attr('href');

				// Show target tbody and hide others
				$('#passenger_details tbody').removeClass('selected');
				$(thisTarget).addClass('selected');
				this.blur();
				return false;
			}
		);

		// Add click listener to seats
		$('#airplane a').click(function()
			{
				// Asign value of the link target
				var thisTarget = $(this).attr('href');

				// Show target tbody and hide others
				$('#passenger_details tbody').removeClass('selected');
				$(thisTarget).addClass('selected');

				// Swap out class="selected" for tab
				$('#tabs a').removeClass('selected');
				$('#tabs a[@href='+thisTarget+']').addClass('selected');

				// Assign the value of the parent <li class="*">
				var thisSeat = $(this).parent('li').attr('class');

				// Compare parent <li class="*"> against
				// <tr> in <table id="passenger_details">
				var thisRow = $('#passenger_details tr');
				for (var i = 0, j = thisRow.length; i < j; i++)
				{
					if (thisSeat == thisRow[i].className)
					{
						// Add class="selected" to row
						$(thisRow[i]).addClass('selected');

						// Enable inputs and selects so that they can be used
						$(thisRow[i]).children('td').children('input, select').removeAttr('disabled');
					}
					else if (thisSeat + ' selected' == thisRow[i].className)
					{
						// Remove class="selected" from row
						$(thisRow[i]).removeClass('selected');

						// Disable inputs and selects that aren't being used
						$(thisRow[i]).children('td').children('input').attr('disabled', 'disabled').val('');
						$(thisRow[i]).children('td').children('select').each(function()
							{
								this.disabled = true;
								this.selectedIndex = 0;
							}
						);
					}
				}

				// Toggle selected class on/off
				$(this).toggleClass('selected');
				this.blur();
				return false;
			}
		);

		// Assign function to master checkbox
		$('#check_all').click(function()
			{
				if (this.checked === true)
				{
					// Add class="selected" to seat
					$('#airplane a, #passenger_details tbody tr').addClass('selected');
					$('#passenger_details input, #passenger_details select').removeAttr('disabled');
					this.blur();
				}
				else
				{
					// Remove class="selected" from seat
					$('#airplane a, #passenger_details tbody tr').removeClass('selected');
					$('#passenger_details input').attr('disabled', 'disabled').val('');
					$('#passenger_details select').each(function()
						{
							this.disabled = true;
							this.selectedIndex = 0;
						}
					);
					this.blur();
				}
			}
		);

		// Disable the form submission
		$('form').submit(function()
			{
				alert('This is only a test. Were it a real emergency, panic would ensue.');
				return false;
			}
		);
	}
);